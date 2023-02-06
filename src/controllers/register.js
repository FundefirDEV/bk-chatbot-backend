const { googleSheets } = require("../auth");
const moment = require("moment");

const registerController = async (req, res) => {
  const month = {
    Enero: 1,
    Febrero: 2,
    Marzo: 3,
    Abril: 4,
    Mayo: 5,
    Junio: 6,
    Julio: 7,
    Agosto: 8,
    Septiembre: 9,
    Octubre: 10,
    Noviembre: 11,
    Diciembre: 12,
  };
  try {
    const { dateOfBirth } = req.body;
    const googleSheetsSession = googleSheets.getSession();
    const values = [
      moment().format("DD/MM/YYYY HH:mm:ss"),
      req.body.id,
      "Registrarme como socio",
      req.body.groupCode,
      req.body.groupName,
      req.body.groupCountry,
      req.body.state,
      req.body.town,
      req.body.typeOfId,
      req.body.id,
      req.body.name,
      req.body.lastname,
      req.body.phone,
      req.body.email,
      req.body.gender,
      `${dateOfBirth.day}/${month[dateOfBirth.month]}/${dateOfBirth.year}`,
      req.body.scholarship,
      req.body.job,
    ];
    const resp = await googleSheetsSession.spreadsheets.values.append({
      auth: googleSheets.auth,
      spreadsheetId: process.env.SHEET_ID,
      range: "Respuestas de formulario 1!A1:R1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [values],
      },
    });

    return res.status(200).json({
      err: false,
      message: null,
      data: resp,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: true,
      message: err.message,
    });
  }
};

module.exports = {
  registerController,
};

// const metadata = await sheetSession.spreadsheets.get({
//   auth,
//   spreadsheetId: process.env.SHEET_ID,
// });
// const getRows = await googleSheetsSession.spreadsheets.values.get({
//   auth: googleSheets.auth,
//   spreadsheetId: process.env.SHEET_ID,
//   range: "Respuestas de formulario 1",
// });
// res.send(getRows.data);
