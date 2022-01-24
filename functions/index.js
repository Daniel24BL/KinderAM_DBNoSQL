const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onUserCreate = functions.firestore.document('Matricula/{MatriculaId}').onCreate(async (snap, context)  => {
    const values = snap.data();
    
    const query = db.collection("Matricula"); 
    const snapshot = await query.where("Id_Estudiante", "==", values.Id_Estudiante).get();
    const n_matricula = snapshot.size;
   
    if(n_matricula > 1) {
      try {
        const res = await db.collection("Matricula").doc(snap.id).delete();
        await db.collection("log").add({
          descripcion: `El Estudiante con la id '${values.Id_Estudiante}' ya se encuentra matriculado en este programa`
        });
      } catch (error) {
        console.log(error);
      }
    }
  });


  
  

  











// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
