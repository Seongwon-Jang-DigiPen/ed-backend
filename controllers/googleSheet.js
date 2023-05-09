const { google } = require("googleapis");
const jsonData = require("../everitday.json");
const client_email = jsonData.client_email;
const private_key = jsonData.private_key;

async function GetSpreadSheetData() {
  // json 파일을 가지고 인증할 때 다음과 같이 사용합니다.
  // scope는 spread sheet만 주었습니다.
  const authorize = new google.auth.JWT(client_email, null, private_key, [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ]);
  // google spread sheet api 가져오기
  let googleSheet = google.sheets({
    version: "v4",
    auth: authorize,
  });

  const context1 = await googleSheet.spreadsheets.values.get({
    spreadsheetId: "17br-MrWcdKYABxBqwc6ExjZ21w25hE5rwgUG8IyA40U",
    range: "A1:ZZ",
  });

  let value = context1.data.values;
  let length = value[0].length;

  let result = [];
  let nameList = value[0];
  for (let i = 1; i < value.length; ++i) {
    let node = {};
    for (let j = 0; j < length; ++j) {
      node[nameList[j]] = value[i][j];
    }
    result.push(node);
  }
  return result;
}

module.exports = { GetSpreadSheetData };
