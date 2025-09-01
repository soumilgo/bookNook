const admin=require('firebase-admin');
const serviceAccount=require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://libbook-e9202.firebasestorage.app"
});

const db=admin.firestore();
const auth=admin.auth();
const store=admin.storage();

const Users=db.collection('Users');
const Resources=db.collection('Resources');
const Feedback=db.collection('Feedback');
const Admin=db.collection('Admin');

module.exports={Users,auth,Resources,store,db,Feedback};