import firebase from '../firebase.service'

// Export types that exists in Firestore
const { Timestamp, GeoPoint, DocumentReference } = firebase.firestore

export {
    Timestamp,
    GeoPoint,
    DocumentReference,
}

export default firebase.firestore()
