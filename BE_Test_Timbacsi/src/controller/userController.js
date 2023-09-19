import userService from "../services/userService";

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.EditUser(data);

  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "missing require parameter",
    });
  }
  let message = await userService.DeleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get allcode error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error connection",
    });
  }
};
let handleGetAllUsers = async (req, res) => {
  let id = "ALL"; //req.query.id; //get all or id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      users: {},
    });
  }

  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    users,
  });
};
let handleGetUsersbyDate = async (req, res) => {
  let date = req.body.date; //req.query.id; //get all or id
  let idBs = req.body.idBs;
  if (!date && !idBs) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      users: {},
    });
  }

  let users = await userService.getAllUsersbyDate(date, idBs);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

// let searchClinicByName = async (req, res) => {
//   let keyword = req.query.keyword;

//   if (!keyword) {
//     return res.status(200).json({
//       errCode: 1,
//       errMessage: "missing require parameters",
//       clinics: {},
//     });
//   }
//   let clinics = await userService.searchClinicByName(keyword);

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "ok",
//     clinics,
//   });
// };

let searchClinicByName = async (req, res) => {
  let keyword = req.query.keyword;
  let sdtBN = req.body.sdtBN;

  if (!keyword) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      clinics: {},
    });
  }
  let clinics = await userService.searchwhileLogin(keyword, sdtBN);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    clinics,
  });
};

let handleBooking = async (req, res) => {
  let require = req.body;

  if (!require) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      clinics: {},
    });
  }
  let booking = await userService.handleBooking(req.body);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",

    booking,
  });
};

let handlereceivePatient = async (req, res) => {
  let require = req.body;

  if (!require) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      clinics: {},
    });
  }
  let booking = await userService.handlereceivePatient(req.body);

  return res.status(200).json({
    booking,
  });
};

let handleAppraise = async (req, res) => {
  let require = req.body;

  if (!require) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
    });
  }
  let appraise = await userService.handleAppraise(req.body);

  return res.status(200).json({
    appraise,
  });
};

//khoa
let searchSDTBenhnhan = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  let Dienthoai = req.query.keyword;

  if (!Dienthoai) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      thongtinbenhnhans: {},
    });
  }

  let thongtinbenhnhans = await userService.searchSDTBenhnhan(Dienthoai);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    thongtinbenhnhans,
  });
};

let searchIdBenhnhan = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  let id = req.query.keyword;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      thongtinbenhnhans: {},
    });
  }

  let thongtinbenhnhans = await userService.searchIdBenhnhan(id);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    thongtinbenhnhans,
  });
};
let searchSDTLichkham = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  let ngay = req.query.keyword;

  if (!ngay) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      lichkhams: {},
    });
  }

  let lichkhams = await userService.searchSDTLichkham(ngay);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    lichkhams,
  });
};
let searchIDLichkham = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  let iddv = req.query.keyword;

  if (!iddv) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      lichkhams: {},
    });
  }

  let lichkhams = await userService.searchIDLichkham(iddv);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    lichkhams,
  });
};
let searchBooking = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  let id = req.query.keyword;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      bookings: {},
    });
  }

  let bookings = await userService.searchBooking(id);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    bookings,
  });
};
let searchHosodv = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  // let iddv = "ALL";
  let id = req.query.keyword;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      User: {},
    });
  }

  let User = await userService.searchHosodv(id);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    User,
  });
};
let createAppoinment = async (req, res) => {
  try {
    let infor = await userService.createAppoinment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

//duyen
let handleGetHistory = async (req, res) => {
  // let id = "ALL"; //req.query.id; //get all or id
  // let id = req.query.id
  let sdt = req.query.SDT;
  if (!sdt) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      historys: {},
    });
  }

  let historys = await userService.getAllHistorys(sdt);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    historys,
  });
};
let handleGetlUsers = async (req, res) => {
  // let id = "ALL"; //req.query.id; //get all or id
  // let id = req.query.id
  let username = req.query.keyword;
  // let password = req.query.password

  if (!username) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      User: {},
    });
  }

  let User = await userService.handleGetlUsers(username);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    User,
  });
};
let handleLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input",
    });
  }

  let userdata = await userService.handleLogin(username, password);
  console.log(userdata);
  //check email exist
  //compare password
  //return userInfor
  //accept_token: validate user: JWT: json web token
  return res.status(200).json({
    errCode: userdata.errCode,
    message: userdata.errMessage,
    user: userdata.user ? userdata.user : {},
  });
};

module.exports = {
  // handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  searchClinicByName: searchClinicByName,
  handleGetUsersbyDate: handleGetUsersbyDate,
  handleBooking: handleBooking,
  handlereceivePatient: handlereceivePatient,
  handleAppraise: handleAppraise,
  //khoa
  searchSDTBenhnhan: searchSDTBenhnhan,
  searchIdBenhnhan: searchIdBenhnhan,
  searchSDTLichkham: searchSDTLichkham,
  searchBooking: searchBooking,
  searchHosodv: searchHosodv,
  createAppoinment: createAppoinment,
  searchIDLichkham: searchIDLichkham,
  //duyen
  handleGetHistory: handleGetHistory,
  handleGetlUsers: handleGetlUsers,
  handleLogin: handleLogin,
};
