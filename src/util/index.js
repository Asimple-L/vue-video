// import '../assets/js/base/base.js';
// import '../assets/plugins/bootstrap4.0.0/js/bootstrap.bundle.js';
// import '../assets/plugins/bootstrap4.0.0/js/popper.min.js';
// import '../assets/plugins/bootstrap4.0.0/js/bootstrap.js';
// import '../assets/js/base/jquery.nicescroll.js';
import router from "../router";

export const goPage = params => {
  router.push({path: params});
};
