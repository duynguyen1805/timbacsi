const { Op } = require("sequelize");
import db from "../models/index";
import bcrypt, { hash } from "bcryptjs"; //hashpassword

const salt = bcrypt.genSaltSync(10);

let hashUserpwd = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashpassword = await bcrypt.hashSync(password, salt);
      resolve(hashpassword);
      //luu hash password trong db
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (useremail, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = {};
      let isExist = await checkUserEmail(useremail);
      if (isExist) {
        //user ton tai >>> true
        //compare password
        let user = await db.User.findOne({
          //get duoc alldata user
          attributes: ["email", "roleId", "firstName", "lastName", "password"], //get data can thiet
          where: { email: useremail },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password); //false
          if (check) {
            userdata.errCode = 0;
            (userdata.errMessage = "ok"),
              delete user.password,
              (userdata.user = user);
          } else {
            userdata.errCode = 3;
            userdata.errMessage = "Wrong password";
          }
        } else {
          userdata.errCode = 2;
          userdata.errMessage = `User not found. Try again.`;
        }
      } else {
        //return err
        userdata.errCode = 1;
        userdata.errMessage = `Email not found. Try again`;
      }

      resolve(userdata);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true); //TRUE: co user trong db
      } else {
        resolve(false); // FALSE: khong tim thay user
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist ???
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email is already in used",
        });
      } else {
        let hashPasswordfromBcrypt = await hashUserpwd(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordfromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender, //gender type boolean
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        }); //db.MODELS

        resolve({
          errCode: 0,
          message: "ok",
        });
      }

      // let hashPasswordfromBcrypt = await hashUserpwd(data.password);
      // await db.User.create({
      //     email: data.email,
      //     password: hashPasswordfromBcrypt,
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     address: data.address,
      //     phonenumber: data.phonenumber,
      //     gender: data.gender === '1' ? true : false, //gender type boolean
      //     roleId: data.roleId,
      // }) //db.MODELS

      // resolve({
      //     errCode: 0,
      //     message: "ok"
      // })
    } catch (e) {
      reject(e);
    }
  });
};
let EditUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing require parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.image = data.avatar;

        await user.save();
        // await db.User.save({
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     address: data.address,
        //     phonenumber: data.phonenumber,
        // });

        resolve({
          errCode: 0,
          message: "Update user succeeds",
        });
      } else {
        reject({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let DeleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      resolve({
        errCode: 2,
        errMessage: ` user isn't exist`,
      });
    }

    await db.User.destroy({
      where: { id: userId },
    });

    resolve({
      errCode: 0,
      message: "user is delete",
    });
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({});
      }

      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsersbyDate = (date, idBs) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (date) {
        user = await db.bookings.findAll({
          where: { iddv: idBs, ngaykham: date },
        });
        user.sort((a, b) => {
          const getTime = (str) => str.substring(0, 2);
          const timeA = getTime(a.buoikham);
          const timeB = getTime(b.buoikham);
          const order = { SA: 1, TR: 2, CH: 3 };
          return order[timeA] - order[timeB];
        });
      }
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

//chưa login
let searchClinicByName = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinics = await db.User.findAll({
        where: {
          [Op.or]: [
            { name_clinic: { [Op.like]: `%${keyword}%` } },
            { fullname: { [Op.like]: `%${keyword}%` } },
            { keyword: { [Op.like]: `%${keyword}%` } },
          ],
        },
      });
      resolve(clinics);
    } catch (e) {
      reject(e);
    }
  });
};
//search khi đã login
let searchwhileLogin = (keyword, sdtBN, idBacsi) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm các clinics phù hợp với keyword
      let clinics = await db.User.findAll({
        where: {
          [Op.or]: [
            { name_clinic: { [Op.like]: `%${keyword}%` } },
            { fullname: { [Op.like]: `%${keyword}%` } },
            { keyword: { [Op.like]: `%${keyword}%` } },
          ],
        },
      });

      // Nếu có sdtBN
      if (sdtBN) {
        // Tìm các bệnh nhân có sdtBN trong bảng histories
        const patients = await db.histories.findAll({
          where: {
            SDT: sdtBN,
          },
        });

        // Tạo một map để lưu trữ id của các bác sĩ từng khám cho bệnh nhân này
        const clinicIdMap = new Map();

        // Lặp qua danh sách bệnh nhân để lấy id của các bác sĩ từng khám
        for (const patient of patients) {
          clinicIdMap.set(patient.idBacsi, true);
        }

        // Sắp xếp lại danh sách bác sĩ dựa trên sự có mặt của idBacsi trong histories
        clinics.sort((a, b) => {
          const hasIdBacsiA = clinicIdMap.has(a.id);
          const hasIdBacsiB = clinicIdMap.has(b.id);

          if (hasIdBacsiA && !hasIdBacsiB) {
            return -1;
          } else if (!hasIdBacsiA && hasIdBacsiB) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      resolve(clinics);
    } catch (e) {
      reject(e);
    }
  });
};

let handleBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.bookings.create({
        fullname: data.fullname,
        phonenumber: data.phonenumber,
        address: data.address,
        birthday: data.birthday,
        date: data.date,
        time: data.time,
        gender: data.gender,
        active: 0,
      });
      resolve({
        errCode: 0,
        message: "Booking thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handlereceivePatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "missing id",
        });
      }
      let user = await db.bookings.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        //cập nhật trạng thái
        user.active = 1;

        await user.save();
        resolve({
          errCode: 0,
          message: "Đã tiếp nhận",
        });
      } else {
        reject({
          errCode: 1,
          errMessage: "User không tồn tại.",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let handleAppraise = (data) => {
//   // idbenhnhan, idbacsi, typeheart[CM, CS, TĐ]
//   const sdtbenhnhan = data.sdtbenhnhan;
//   const idBS = data.idBS;
//   const typeheart = data.typeheart;

//   return new Promise(async (resolve, reject) => {
//     if (!sdtbenhnhan || !idBS || !typeheart) {
//       resolve({
//         errCode: 1,
//         errMessage: "Missing id",
//       });
//       return;
//     }
//     try {
//       // Kiểm tra người dùng có từng khám bác sỹ đó chưa. Kiểm tra trong bảng 'histories'
//       let users = await db.histories.findAll({
//         where: { SDT: sdtbenhnhan, idBacsi: idBS },
//         raw: false,
//       });
//       // Tìm bác sĩ theo idBS trong bảng 'doctor'
//       let doctor = await db.User.findOne({
//         where: { id: idBS },
//         raw: false,
//       });

//       if (!users.length || !doctor) {
//         resolve({
//           errCode: 1,
//           errMessage:
//             "Người dùng chưa từng khám bác sĩ này or BS không tồn tại",
//         });
//         return;
//       }
//       // Kiểm tra & tăng lượt đánh giá bác sỹ
//       if (typeheart === "CM" && users[0].CM_heart === 0) {
//         doctor.CM_heart += 1;
//       } else if (typeheart === "CS" && users[0].CS_heart === 0) {
//         doctor.CS_heart += 1;
//       } else if (typeheart === "TĐ" && users[0].TĐ_heart === 0) {
//         doctor.TĐ_heart += 1;
//       } else {
//         if (typeheart === "CM" && users[0].CM_heart !== 0) {
//           doctor.CM_heart -= 1;
//         } else if (typeheart === "CS" && users[0].CS_heart !== 0) {
//           doctor.CS_heart -= 1;
//         } else if (typeheart === "TĐ" && users[0].TĐ_heart !== 0) {
//           doctor.TĐ_heart -= 1;
//         }
//       }
//       // Kiểm tra và cập nhật trạng thái của user đã đánh giá hay chưa
//       users.forEach((user) => {
//         if (typeheart === "CM") {
//           if (user.CM_heart === 0) {
//             user.CM_heart = 1;
//           } else {
//             user.CM_heart = 0;
//           }
//         } else if (typeheart === "CS") {
//           if (user.CS_heart === 0) {
//             user.CS_heart = 1;
//           } else {
//             user.CS_heart = 0;
//           }
//         } else if (typeheart === "TĐ") {
//           if (user.TĐ_heart === 0) {
//             user.TĐ_heart = 1;
//           } else {
//             user.TĐ_heart = 0;
//           }
//         }
//       });

//       await doctor.save();
//       // await user.save();
//       await Promise.all(users.map((user) => user.save()));
//       resolve({
//         errCode: 0,
//         message: `Đánh giá ${typeheart} phòng khám`,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

let handleAppraise = (data) => {
  // idbenhnhan, idbacsi, typeheart[CM, CS, TĐ]
  const sdtbenhnhan = data.sdtbenhnhan;
  const idBS = data.idBS;
  const typeheart = data.typeheart;

  return new Promise(async (resolve, reject) => {
    if (!sdtbenhnhan || !idBS || !typeheart) {
      resolve({
        errCode: 1,
        errMessage: "Missing id",
      });
      return;
    }
    try {
      // Kiểm tra người dùng có từng khám bác sỹ đó chưa. Kiểm tra trong bảng 'histories'
      let users = await db.histories.findAll({
        where: { SDT: sdtbenhnhan, idBacsi: idBS },
        raw: false,
      });
      // Tìm bác sĩ theo idBS trong bảng 'doctor'
      let doctor = await db.User.findOne({
        where: { id: idBS },
        raw: false,
      });

      if (!users.length || !doctor) {
        resolve({
          errCode: 1,
          errMessage: "Bạn chưa sử dụng DV của PK này",
        });
        return;
      }
      // Kiểm tra & tăng lượt đánh giá bác sỹ
      if (typeheart === "CM" && users[0].CM_heart === 0) {
        doctor.CM_heart += 1;
        resolve({
          errCode: 0,
          message: "Đánh giá CM_heart thành công",
        });
      } else if (typeheart === "CS" && users[0].CS_heart === 0) {
        doctor.CS_heart += 1;
        resolve({
          errCode: 0,
          message: "Đánh giá CS_heart thành công",
        });
      } else if (typeheart === "TĐ" && users[0].TĐ_heart === 0) {
        doctor.TĐ_heart += 1;
        resolve({
          errCode: 0,
          message: "Đánh giá TĐ_heart thành công",
        });
      } else {
        if (typeheart === "CM" && users[0].CM_heart !== 0) {
          doctor.CM_heart -= 1;
        } else if (typeheart === "CS" && users[0].CS_heart !== 0) {
          doctor.CS_heart -= 1;
        } else if (typeheart === "TĐ" && users[0].TĐ_heart !== 0) {
          doctor.TĐ_heart -= 1;
        }
        resolve({
          errCode: 0,
          message: "Đánh giá đã được hủy",
        });
      }
      // Kiểm tra và cập nhật trạng thái của user đã đánh giá hay chưa
      users.forEach((user) => {
        if (typeheart === "CM") {
          if (user.CM_heart === 0) {
            user.CM_heart = 1;
          } else {
            user.CM_heart = 0;
          }
        } else if (typeheart === "CS") {
          if (user.CS_heart === 0) {
            user.CS_heart = 1;
          } else {
            user.CS_heart = 0;
          }
        } else if (typeheart === "TĐ") {
          if (user.TĐ_heart === 0) {
            user.TĐ_heart = 1;
          } else {
            user.TĐ_heart = 0;
          }
        }
      });

      await doctor.save();
      await Promise.all(users.map((user) => user.save()));
    } catch (error) {
      reject(error);
    }
  });
};

//khoa
let searchSDTBenhnhan = (Dienthoai) => {
  return new Promise(async (resolve, reject) => {
    try {
      let benhnhan = "";
      if (Dienthoai === "ALL") {
        benhnhan = await db.thongtinbenhnhans.findAll({
          // attributes: {
          //     exclude: ['password']
          // }
        });
      }

      if (Dienthoai && Dienthoai !== "ALL") {
        benhnhan = await db.thongtinbenhnhans.findAll({
          where: { Dienthoai: Dienthoai },
          //  fetchData.thongtinbenhnhans[{ Dienthoai: Dienthoai }]['COUNT(*)'],
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(benhnhan);
    } catch (e) {
      reject(e);
    }
  });
};
let searchIdBenhnhan = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let benhnhan = "";
      if (id === "ALL") {
        benhnhan = await db.thongtinbenhnhans.findAll({
          // attributes: {
          //     exclude: ['password']
          // }
        });
      }

      if (id && id !== "ALL") {
        benhnhan = await db.thongtinbenhnhans.findAll({
          where: { id: id },
          //  fetchData.thongtinbenhnhans[{ Dienthoai: Dienthoai }]['COUNT(*)'],
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(benhnhan);
    } catch (e) {
      reject(e);
    }
  });
};
let searchSDTLichkham = (ngay) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lichkham = "";
      if (ngay === "ALL") {
        lichkham = await db.lichkhams.findAll({
          // attributes: {
          //     exclude: ['password']
          // }y
        });
      }

      if (ngay && ngay !== "ALL") {
        lichkham = await db.lichkhams.findAll({
          where: { ngay: ngay },
          //  fetchData.thongtinbenhnhans[{ Dienthoai: Dienthoai }]['COUNT(*)'],
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(lichkham);
    } catch (e) {
      reject(e);
    }
  });
};
let searchIDLichkham = (iddv) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lichkham = "";
      if (iddv === "ALL") {
        lichkham = await db.lichkhams.findAll({
          // attributes: {
          //     exclude: ['password']
          // }y
        });
      }

      if (iddv && iddv !== "ALL") {
        lichkham = await db.lichkhams.findAll({
          where: { iddv: iddv },
          //  fetchData.thongtinbenhnhans[{ Dienthoai: Dienthoai }]['COUNT(*)'],
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(lichkham);
    } catch (e) {
      reject(e);
    }
  });
};
let searchBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = "";
      if (id === "ALL") {
        booking = await db.bookings.findAll({
          // attributes: {
          //     exclude: ['password']
          // }
        });
      }

      if (id && id !== "ALL") {
        booking = await db.bookings.findAll({
          where: { id: id },
          //  fetchData.thongtinbenhnhans[{ Dienthoai: Dienthoai }]['COUNT(*)'],
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(booking);
    } catch (e) {
      reject(e);
    }
  });
};
let createAppoinment = (data) => {
  // const hova
  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.iddv ||
        !data.sdt ||
        !data.gt ||
        !data.hoten ||
        !data.ngaysinh ||
        !data.diachi ||
        !data.trieuchung ||
        !data.ngaydat ||
        !data.buoikham ||
        !data.stt ||
        // !data.time ||
        // !data.active ||
        !data.ngaykham

        // !data.name_clinic ||
        // !data.fullname ||
        // !data.idbn ||
        // !data.ho ||
        // !data.ten ||
      ) {
        resovle({
          errCode: 100,
          errMessage: "Missing parameter",
        });
      } else {
        // let ngaydatlich = data.ngaydat.getDay
        let HT = data.hoten.split(" ");
        let ho1;
        ho1 = HT[0];
        let ten1;
        if (HT.length == 2) {
          ten1 = HT[1];
        } else if (HT.length == 3) {
          ten1 = HT[1] + " " + HT[2];
        } else if (HT.length == 4) {
          ten1 = HT[1] + " " + HT[2] + " " + HT[3];
        } else if (HT.length == 5) {
          ten1 = HT[1] + " " + HT[2] + " " + HT[3] + " " + HT[4];
        } else if (HT.length == 6) {
          ten1 = HT[1] + " " + HT[2] + " " + HT[3] + " " + HT[4] + " " + HT[5];
        }

        let thongtinbenhnhans = await db.thongtinbenhnhans.findOne({
          where: {
            Dienthoai: data.sdt,
            Ten: ten1,
            Ho: ho1,
          },
        });

        if (thongtinbenhnhans) {
          let lichkham = await db.lichkhams.findOne({
            where: {
              iddv: data.iddv,
              ngay: data.ngaykham,
            },
            raw: false,
          });
          if (lichkham) {
            if (
              data.buoikham == "SA" &&
              data.stt <= lichkham.chovuotsa + lichkham.slsa
            ) {
              lichkham.slsaHientai++;
              await lichkham.save();

              await db.bookings.create({
                // name_clinic: data.name_clinic,
                iddv: data.iddv,
                idbn: thongtinbenhnhans.id,
                hoten: data.hoten,
                sdt: data.sdt,
                ngaysinh: data.ngaysinh,
                diachi: data.diachi,
                Trieuchung: data.trieuchung,
                ngaydat: data.ngaydat,
                ngaykham: data.ngaykham,
                gioitinh: data.gt,
                stt: data.stt,
                buoikham: "SA",
                time: lichkham.batdausa + "-" + lichkham.ketthucsa,
                active: 0,
              });

              resovle({
                errCode: 0,
                errMessage: "co lichkham saved",
              });
            }
            // else {
            //   resovle({
            //     errCode: 5,
            //     errMessage: "lịch khám đầy",
            //   });
            // }
            else if (
              data.buoikham == "TR" &&
              data.stt <= lichkham.chovuottr + lichkham.sltr
            ) {
              lichkham.sltrHientai++;
              await lichkham.save();

              await db.bookings.create({
                // name_clinic: data.name_clinic,
                iddv: data.iddv,
                idbn: thongtinbenhnhans.id,
                hoten: data.hoten,
                sdt: data.sdt,
                ngaysinh: data.ngaysinh,
                diachi: data.diachi,
                Trieuchung: data.trieuchung,
                ngaydat: data.ngaydat,
                ngaykham: data.ngaykham,
                gioitinh: data.gt,
                stt: data.stt,
                buoikham: "TR",
                time: lichkham.batdautr + "-" + lichkham.ketthuctr,
                active: 0,
              });

              resovle({
                errCode: 0,
                errMessage: "co lichkham saved",
              });
            }
            // else {
            //   resovle({
            //     errCode: 6,
            //     errMessage: "lịch khám đầy",
            //   });
            // }
            else if (
              data.buoikham == "CH" &&
              data.stt <= lichkham.chovuotch + lichkham.slch
            ) {
              lichkham.slchHientai++;
              await lichkham.save();

              await db.bookings.create({
                // name_clinic: data.name_clinic,
                iddv: data.iddv,
                idbn: thongtinbenhnhans.id,
                hoten: data.hoten,
                sdt: data.sdt,
                ngaysinh: data.ngaysinh,
                diachi: data.diachi,
                Trieuchung: data.trieuchung,
                ngaydat: data.ngaydat,
                ngaykham: data.ngaykham,
                gioitinh: data.gt,
                stt: data.stt,
                buoikham: "CH",
                time: lichkham.batdauch + "-" + lichkham.ketthucch,
                active: 0,
              });

              resovle({
                errCode: 0,
                errMessage: "co lichkham saved",
              });
            } else {
              resovle({
                errCode: 7,
                errMessage: "lịch khám đầy",
              });
            }
          } else {
            resovle({
              errCode: 1,
              errMessage: "k lichkham saved",
            });
          }
          resovle({
            errCode: 0,
            errMessage: "dat !",
          });
        } else {
          //   await db.thongtinbenhnhans.create({
          //     Ho: ho1,
          //     Ten: ten1,
          //     Ngaysinh: data.ngaysinh,
          //     Dienthoai: data.sdt,
          //     Gioitinh: data.gt,
          //     Diachi: data.diachi,
          //     Trieuchung: data.trieuchung,
          //   })

          // let thongtinbenhnhans = await db.thongtinbenhnhans.findOne({
          //   where: {
          //     Dienthoai: data.sdt,
          //     Ten: ten1,
          //     Ho: ho1
          //   },
          // });
          // await db.thongtinbenhnhans.create({
          //   Ho: ho1,
          //   Ten: ten1,
          //   Ngaysinh: data.ngaysinh,
          //   Dienthoai: data.sdt,
          //   Gioitinh: data.gt,
          //   Diachi: data.diachi,
          //   Trieuchung: data.trieuchung,
          // })
          // await db.bookings.create({
          //   iddv: data.iddv,
          //   idbn: data.idbn,
          //   hoten: data.hoten,
          //   sdt: data.sdt,
          //   ngaysinh: data.ngaysinh,
          //   diachi: data.diachi,
          //   ngaydat: data.ngaydat,
          //   ngaykham: data.ngaykham,
          //   stt: data.stt,
          //   buoikham: data.buoikham

          // });
          let lichkham = await db.lichkhams.findOne({
            where: {
              iddv: data.iddv,
              ngay: data.ngaykham,
            },
            raw: false,
          });
          if (lichkham) {
            if (
              data.buoikham == "SA" &&
              data.stt <= lichkham.chovuotsa + lichkham.slsa
            ) {
              lichkham.slsaHientai++;
              await lichkham.save();

              await db.thongtinbenhnhans.create({
                Ho: ho1,
                Ten: ten1,
                Ngaysinh: data.ngaysinh,
                Dienthoai: data.sdt,
                Gioitinh: data.gt,
                Diachi: data.diachi,
                // Trieuchung: data.trieuchung,
              });

              let thongtinbenhnhans = await db.thongtinbenhnhans.findOne({
                where: {
                  Dienthoai: data.sdt,
                  Ten: ten1,
                  Ho: ho1,
                },
              });

              await db.bookings.create({
                // name_clinic: data.name_clinic,
                iddv: data.iddv,
                idbn: thongtinbenhnhans.id,
                hoten: data.hoten,
                sdt: data.sdt,
                ngaysinh: data.ngaysinh,
                diachi: data.diachi,
                Trieuchung: data.trieuchung,

                ngaydat: data.ngaydat,
                ngaykham: data.ngaykham,
                gioitinh: data.gt,
                stt: data.stt,
                buoikham: "SA",
                time: lichkham.batdausa + "-" + lichkham.ketthucsa,
                active: 0,
              });
              // await db.thongtinbenhnhans.create({
              //   Ho: ho1,
              //   Ten: ten1,
              //   Ngaysinh: data.ngaysinh,
              //   Dienthoai: data.sdt,
              //   Gioitinh: data.gt,
              //   Diachi: data.diachi,
              //   Trieuchung: data.trieuchung,
              // })

              resovle({
                errCode: 0,
                errMessage: "co lichkham saveddd",
              });
            }
            // else {
            //   resovle({
            //     errCode: 8,
            //     errMessage: "lịch khám đầy",
            //   });
            // }
            else if (
              data.buoikham == "TR" &&
              data.stt <= lichkham.chovuottr + lichkham.sltr
            ) {
              lichkham.sltrHientai++;
              await lichkham.save();

              await db.thongtinbenhnhans.create({
                Ho: ho1,
                Ten: ten1,
                Ngaysinh: data.ngaysinh,
                Dienthoai: data.sdt,
                Gioitinh: data.gt,
                Diachi: data.diachi,
                // Trieuchung: data.trieuchung,
              });

              let thongtinbenhnhans = await db.thongtinbenhnhans.findOne({
                where: {
                  Dienthoai: data.sdt,
                  Ten: ten1,
                  Ho: ho1,
                },
              });

              await db.bookings.create({
                // name_clinic: data.name_clinic,
                iddv: data.iddv,
                idbn: thongtinbenhnhans.id,
                hoten: data.hoten,
                sdt: data.sdt,
                ngaysinh: data.ngaysinh,
                diachi: data.diachi,
                Trieuchung: data.trieuchung,

                ngaydat: data.ngaydat,
                ngaykham: data.ngaykham,
                gioitinh: data.gt,
                stt: data.stt,
                buoikham: "TR",
                time: lichkham.batdautr + "-" + lichkham.ketthuctr,
                active: 0,
              });
              // await db.thongtinbenhnhans.create({
              //   Ho: ho1,
              //   Ten: ten1,
              //   Ngaysinh: data.ngaysinh,
              //   Dienthoai: data.sdt,
              //   Gioitinh: data.gt,
              //   Diachi: data.diachi,
              //   Trieuchung: data.trieuchung,
              // })

              resovle({
                errCode: 0,
                errMessage: "co lichkhammm saved",
              });
            }
            // else {
            //   resovle({
            //     errCode: 9,
            //     errMessage: "lịch khám đầy",
            //   });
            // }
            else if (
              data.buoikham == "CH" &&
              data.stt <= lichkham.chovuotch + lichkham.slch
            ) {
              lichkham.slchHientai++;
              await lichkham.save();

              await db.thongtinbenhnhans.create({
                Ho: ho1,
                Ten: ten1,
                Ngaysinh: data.ngaysinh,
                Dienthoai: data.sdt,
                Gioitinh: data.gt,
                Diachi: data.diachi,
                // Trieuchung: data.trieuchung,
              });

              let thongtinbenhnhans = await db.thongtinbenhnhans.findOne({
                where: {
                  Dienthoai: data.sdt,
                  Ten: ten1,
                  Ho: ho1,
                },
              });

              await db.bookings.create({
                // name_clinic: data.name_clinic,
                // fullname: data.fullname,
                iddv: data.iddv,
                idbn: thongtinbenhnhans.id,
                hoten: data.hoten,
                sdt: data.sdt,
                ngaysinh: data.ngaysinh,
                diachi: data.diachi,
                Trieuchung: data.trieuchung,
                ngaydat: data.ngaydat,
                ngaykham: data.ngaykham,
                gioitinh: data.gt,
                stt: data.stt,
                buoikham: "CH",
                time: lichkham.batdauch + "-" + lichkham.ketthuch,
                active: 0,
              });

              // await db.thongtinbenhnhans.create({
              //   Ho: ho1,
              //   Ten: ten1,
              //   Ngaysinh: data.ngaysinh,
              //   Dienthoai: data.sdt,
              //   Gioitinh: data.gt,
              //   Diachi: data.diachi,
              //   Trieuchung: data.trieuchung,
              // })

              resovle({
                errCode: 0,
                errMessage: "co lichkham saved",
              });
            } else {
              resovle({
                errCode: 10,
                errMessage: "lịch khám đầy",
              });
            }
          } else {
            resovle({
              errCode: 11,
              errMessage: "k lichkham saved",
            });
          }
          resovle({
            errCode: 0,
            errMessage: "luu va dat",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "luu va dádasdat",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let searchHosodv = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = "";
      if (id === "ALL") {
        User = await db.User.findAll({
          // attributes: {
          //     exclude: ['password']
          // }
        });
      }

      if (id && id !== "ALL") {
        User = await db.User.findAll({
          where: { id: id },
          //  fetchData.thongtinbenhnhans[{ Dienthoai: Dienthoai }]['COUNT(*)'],
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(User);
    } catch (e) {
      reject(e);
    }
  });
};

//duyen
let getAllHistorys = (sdt) => {
  return new Promise(async (resolve, reject) => {
    try {
      let historys = "";
      if (sdt === "ALL") {
        historys = await db.histories.findAll({
          // attributes: {
          //     exclude: ['password']
          // }
        });
      }

      if (sdt && sdt !== "ALL") {
        historys = await db.histories.findAll({
          where: { SDT: sdt },
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(historys);
    } catch (e) {
      reject(e);
    }
  });
};
let handleGetlUsers = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let User = "";
      if (username === "ALL") {
        historys = await db.User.findAll({
          // attributes: {
          //     exclude: ['password']
          // }
        });
      }

      if (username) {
        User = await db.User.findAll({
          where: {
            username: username,
            // password: password
          },
          //   attributes: {
          //     exclude: ["password"],
          //   },
        });
      }
      resolve(User);
    } catch (e) {
      reject(e);
    }
  });
};
let handleLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = {};
      if (username) {
        //user ton tai >>> true
        //compare password
        let user = await db.User.findOne({
          //get duoc alldata user
          attributes: ["username", "password"], //get data can thiet
          where: { username: username },
          raw: true,
        });
        if (user) {
          if (password === user.password) {
            userdata.errCode = 0;
            userdata.message = "ok";
          } else {
            userdata.errCode = 1;
            userdata.message = "sai password";
          }
        } else {
          userdata.errCode = 2;
          userdata.message = "user khong ton tai";
        }
        resolve(userdata);
        // if (user) {
        //   // let check = await bcrypt.compareSync(password, user.password); //false
        //   if (password === user.password) {
        //     userdata.errCode = 0;
        //     (userdata.errMessage = "ok"),
        //       delete user.password,
        //       (userdata.user = user);
        //   } else {
        //     userdata.errCode = 3;
        //     userdata.errMessage = "Wrong password";
        //   }
        // } else {
        //   userdata.errCode = 2;
        //   userdata.errMessage = `User not found. Try again.`;
        // }
      } else {
        //return err
        reject({
          errCode: 3,
          errMessage: `Email not found. Try again`,
        });
        // userdata.errCode = 1;
        // userdata.errMessage = `Email not found. Try again`;
      }
      // resolve(userdata);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers,
  getAllUsers,
  createNewUser: createNewUser,
  EditUser: EditUser,
  DeleteUser: DeleteUser,
  getAllCodeService: getAllCodeService,
  searchClinicByName: searchClinicByName,
  searchwhileLogin: searchwhileLogin,
  getAllUsersbyDate: getAllUsersbyDate,
  handleBooking: handleBooking,
  handlereceivePatient: handlereceivePatient,
  handleAppraise: handleAppraise,
  //khoa
  searchSDTBenhnhan: searchSDTBenhnhan,
  searchIdBenhnhan: searchIdBenhnhan,
  searchSDTLichkham: searchSDTLichkham,
  searchBooking: searchBooking,
  createAppoinment: createAppoinment,
  searchHosodv: searchHosodv,
  searchIDLichkham: searchIDLichkham,
  //duyen
  getAllHistorys: getAllHistorys,
  handleGetlUsers: handleGetlUsers,
  handleLogin: handleLogin,
};
