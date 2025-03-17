const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("./firebase.json")),
});

async function listUsers() {
  const listUsersResult = await admin.auth().listUsers(10);
  listUsersResult.users.forEach((userRecord) => {
    console.log("User:", userRecord.toJSON());
  });
}

listUsers();
