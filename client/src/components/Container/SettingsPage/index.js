import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribe, unsubscribe } from '../../../redux/actions/payments';
import { updateEmployee } from '../../../redux/actions/auth';
import { addItem, getItems } from '../../../redux/actions/items';
import RestaurantInfo from '../../Presentational/RestaurantInfo';
import Billing from '../../Presentational/Billing';
import UpdateEmployee from '../../Presentational/UpdateEmployee';
import CreateItem from '../../Presentational/CreateItem';
import UploadModal from '../../Presentational/UploadModal';

import * as s from './styles';

class SettingsPage extends React.Component {
  state = {
    images: {},
    uploadModalIsOpen: false
  };

  componentDidMount() {
    this.props.getItems();
  }

  updateEmployee = (info) => {
    this.props.updateEmployee(info);
  };

  setImageUrls = (images) => this.setState({ images });

  openUploadModal = () => this.setState({ uploadModalIsOpen: true });

  closeUploadModal = () => this.setState({ uploadModalIsOpen: false });

  adminDisplay = () => (
    <React.Fragment>
      <RestaurantInfo />
      <Billing
        membership={this.props.membership}
        subscribe={this.props.subscribe}
        unsubscribe={this.props.unsubscribe}
      />
    </React.Fragment>
  );

  managerDisplay = () => (
    <React.Fragment>
      <CreateItem
        addItem={this.props.addItem}
        itemCategories={this.props.itemCategories}
        images={this.state.images}
        openUploadModal={this.openUploadModal}
      />
    </React.Fragment>
  );

  render() {
    const { manager, admin } = this.props.role;
    return (
      <s.Container>
        <UploadModal
          open={this.state.uploadModalIsOpen}
          setImageUrls={this.setImageUrls}
          closeUploadModal={this.closeUploadModal}
        />
        <UpdateEmployee updateEmployee={this.updateEmployee} />
        {admin && this.adminDisplay()}
        {(manager || admin) && this.managerDisplay()}
      </s.Container>
    );
  }
}

SettingsPage.propTypes = {
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  membership: PropTypes.bool,
  itemCategories: PropTypes.arrayOf(PropTypes.string),
  addItem: PropTypes.func,
  getItems: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
  updateEmployee: PropTypes.func
};

SettingsPage.defaultProps = {
  role: {
    admin: false,
    manager: false
  },
  membership: false,
  itemCategories: ['default category one, default category two'],
  addItem: () => {},
  getItems: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  updateEmployee: () => {}
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
  membership: state.auth.membership,
  itemCategories: state.items.itemList.reduce((accum, currentVal) => {
    if (currentVal.category && !accum.includes(currentVal.category)) {
      accum.push(currentVal.category);
    }
    return accum;
  }, [])
});

export default connect(
  mapStateToProps,
  { addItem, getItems, subscribe, unsubscribe, updateEmployee }
)(SettingsPage);
