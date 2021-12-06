import _ from 'lodash';
import constant from '../constants';
import {
  PRODUCT_LIST,
  PRODUCT_DETAIL,
  DUMP,
  SET_WIHSLIST_PRODUCTS,
  LOGIN,
  CART_LIST,
} from '../actions/ActionTypes';
import singleton from '../singleton';

import {dispatchRequest} from '../actions/DispatchActions';
import {store} from '../store';
import {request, generalSaveAction, logout} from '../actions/ServiceAction';
import {showMessage} from 'react-native-flash-message';

const callback = (response) => {
  global.log('response', response);
};

const getProductList = (
  url = constant.product_list,
  params,
  showLoader = true,
  successCb = callback,
  failureCb = callback,
  isConcat = false,
) => {
  store.dispatch(
    request(
      url,
      'get',
      params,
      PRODUCT_LIST,
      showLoader,
      successCb,
      failureCb,
      isConcat,
    ),
  );
};

const getProductDetail = (
  params,
  showLoader = true,
  successCb = callback,
  failureCb = callback,
) => {
  store.dispatch(
    request(
      constant.product_by_id,
      'get',
      params,
      PRODUCT_DETAIL,
      showLoader,
      successCb,
      failureCb,
    ),
  );
};

const getCartDetail = (user_id, showLoader = true) => {
  store.dispatch(
    request(constant.cartList, 'get', {user_id}, CART_LIST, showLoader),
  );
};

const productAddToCart = (
  {productId, userId},
  showLoader = true,
  successCb = callback,
  failureCb = callback,
) => {
  let payload = new FormData();
  payload.append('product_id', productId);
  payload.append('quantity', 1);
  payload.append('user_id', userId);
  store.dispatch(
    request(
      constant.addToCart,
      'post',
      payload,
      DUMP,
      showLoader,
      (response) => {
        showMessage({
          message: 'Product added successfuly',
          type: 'success',
          icon: 'success',
        });

        getCartDetail(userId, false);
        successCb(response);
      },
      failureCb,
    ),
  );
};

const productAddToWishlist = (
  {product_id, user_id},
  showLoader = true,
  successCb = callback,
  failureCb = callback,
) => {
  let payload = new FormData();
  payload.append('product_id', product_id);
  payload.append('user_id', user_id);
  store.dispatch(
    request(
      constant.favourite_product_add,
      'post',
      payload,
      DUMP,
      showLoader,
      successCb,
      failureCb,
    ),
  );
};

const addProductIdtoWishList = (product_id, wishlistProducts, user) => (
  response,
) => {
  product_id = `${product_id}`;
  let data = [...wishlistProducts, product_id];
  let cloneUser = _.cloneDeep(user);
  cloneUser['meta_data'].push({value: {product_id}});
  store.dispatch(generalSaveAction(SET_WIHSLIST_PRODUCTS, {data}));
  store.dispatch(generalSaveAction(LOGIN.SUCCESS, {data: cloneUser}));
};

const removeProductFromWishlist = (
  {product_id, user_id},
  showLoader = true,
  successCb = callback,
  failureCb = callback,
) => {
  let payload = new FormData();
  payload.append('product_id', product_id);
  payload.append('user_id', user_id);
  store.dispatch(
    request(
      constant.favourite_product_delete,
      'post',
      payload,
      DUMP,
      showLoader,
      successCb,
      failureCb,
    ),
  );
};

const removeProductIdtoWishList = (
  product_id,
  wishlistProducts,
  user,
  onDone = null,
) => (response) => {
  product_id = `${product_id}`;
  let data = wishlistProducts.filter((item) => item != product_id);
  let cloneUser = _.cloneDeep(user);
  cloneUser['meta_data'] = cloneUser['meta_data'].filter(
    (prdct) => prdct.value.product_id != product_id,
  );
  onDone && onDone(product_id);
  store.dispatch(generalSaveAction(SET_WIHSLIST_PRODUCTS, {data}));
  store.dispatch(generalSaveAction(LOGIN.SUCCESS, {data: cloneUser}));
};

const getContries = (
  params = null,
  showLoader = true,
  successCb = callback,
  failureCb = callback,
) => {
  store.dispatch(
    request(
      constant.country_list,
      'get',
      params,
      DUMP,
      showLoader,
      successCb,
      failureCb,
    ),
  );
};

const getStates = (
  params = null,
  showLoader = true,
  successCb = callback,
  failureCb = callback,
) => {
  store.dispatch(
    request(
      constant.state_list,
      'get',
      params,
      DUMP,
      showLoader,
      successCb,
      failureCb,
    ),
  );
};

// NotificationFunctions
const callDispatch = (request) => {
  const dispatch = singleton.storeRef.dispatch;
  dispatch(request);
};

const getUser = () => {
  return singleton.storeRef.getState().loginReducer.data;
};

const setNotificationViewed = (
  id = null,
  showLoader = false,
  successCb = callback,
  failureCb = callback,
) => {
  store.dispatch(
    request(
      constant.notification_by_id,
      'get',
      {id},
      DUMP,
      showLoader,
      successCb,
      failureCb,
    ),
  );
};

const logoutUser = (id, showLoader = true, successCb, failureCb) => {
  store.dispatch(
    request(
      constant.logout,
      'get',
      {id},
      DUMP,
      showLoader,
      () => {
        successCb();
        store.dispatch(logout());
      },
      failureCb,
    ),
  );
};

const getNotificationBadge = (badge = null) => {
  // if (badge != null) {
  //   callDispatch(replace(USER, 'user_bedge', 'id', getUser().id, badge))
  // } else {
  //   const payload = new FormData()
  //   payload.append('_method', 'PUT')
  //   payload.append('is_read', '1')
  //   payload.append('is_viewed', '1')
  //   callDispatch(request(
  //     null,
  //     constant.getNotificationBadge,
  //     'get',
  //     null,
  //     false,
  //     (res) => callDispatch(replace(USER, 'user_bedge', 'id', getUser().id, res.badge_count))
  //   ))
  // }
};

const setUnreadCountInReducer = ({total_unread_count, users_unread_count}) => {
  global.log('setUnreadCountInReducer');
  // callDispatch(generalAction(SET_CHAT_UNREAD_COUNT, {
  //   totalUnreadCount: total_unread_count,
  //   usersUnreadCount: users_unread_count
  // }))
};

//   const getUnreadCount = () => singleton.storeRef.getState().chatReducer.totalUnreadCount

export {
  getProductList,
  getProductDetail,
  productAddToCart,
  productAddToWishlist,
  addProductIdtoWishList,
  getCartDetail,
  removeProductFromWishlist,
  removeProductIdtoWishList,
  setUnreadCountInReducer,
  getNotificationBadge,
  setNotificationViewed,
  callDispatch,
  getUser,
  getContries,
  getStates,
  logoutUser,
  //   getUnreadCount
};
