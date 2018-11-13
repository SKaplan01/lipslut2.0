import firebase from 'firebase'
import 'firebase/firestore'
import { navigateTo } from 'gatsby-link'
import moment from 'moment'
import postLambda from './postLambda'

const config = {
  apiKey: 'AIzaSyCbFZ7xiMAbvt9LtlknAa4eeK-WMqV9f1s',
  authDomain: 'lipslut-d08c5.firebaseapp.com',
  databaseURL: 'https://lipslut-d08c5.firebaseio.com',
  projectId: 'lipslut-d08c5',
  storageBucket: 'lipslut-d08c5.appspot.com',
  messagingSenderId: '973290593236',
}

// TODO move functions into seprate modules Like this
export const addEmail = email => {
  this.store()
    .collection('emails')
    .add({
      email: email,
    })
}

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.store = firebase.firestore
    this.auth = firebase.auth
  }

  addEmail = email => {
    this.store()
      .collection('emails')
      .add({
        email: email,
      })
  }

  signIn = uid => {
    return this.store()
      .collection('users')
      .doc(uid)
      .get()
  }

  checkDb = email => {
    // TODO Learn to query db for email string and see if user exists to avoid login no write issue
    this.store()
      .collection('users')
      .doc(uid)
      .get()
      ? true
      : false
  }

  login = (componentThis, signInMethod, email, password) => {
    switch (signInMethod) {
      case 'google':
        this.auth()
          .signInWithPopup(new this.auth.GoogleAuthProvider())
          .then(user => {
            debugger
            navigateTo('/')
          })
          .catch(error => {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
        break
      case 'emailPassword':
        this.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => navigateTo('/'))
          .catch(function(error) {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
      case 'facebook':
        this.auth()
          .signInWithPopup(new this.auth.FacebookAuthProvider())
          .then(() => navigateTo('/'))
          .catch(error => {
            let errorMessage = error.message
            componentThis.props.handleError(errorMessage)
          })
      default:
        console.error('incorrect usage')
        break
    }
  }

  signupGoogle = componentThis => {
    this.auth()
      .signInWithPopup(new this.auth.GoogleAuthProvider())
      .then(user => {
        let userInfo = {
          uid: user.user.uid,
          email: user.additionalUserInfo.profile.email,
          firstName: user.additionalUserInfo.profile.given_name,
          lastName: user.additionalUserInfo.profile.family_name,
          password: user.additionalUserInfo.profile.id,
          newsletter: true,
        }
        this.storeUser(userInfo)
      })
      .catch(error => {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  signupFacebook = componentThis => {
    this.auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(user => {
        let userInfo = {
          uid: user.user.uid,
          email: user.additionalUserInfo.profile.email,
          firstName: user.additionalUserInfo.profile.first_name,
          lastName: user.additionalUserInfo.profile.last_name,
          password: user.additionalUserInfo.profile.id,
          newsletter: true,
        }
        this.storeUser(userInfo)
      })
      .catch(error => {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  signupEmailPassword = (
    componentThis,
    firstName,
    lastName,
    email,
    password,
    newsletter
  ) => {
    this.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        let userInfo = {
          uid: user.user.uid,
          email,
          firstName,
          lastName,
          password,
          newsletter,
        }
        if (newsletter) {
          this.addEmail(userInfo.email)
        }
        this.storeUser(userInfo)
      })
      .catch(function(error) {
        const errorMessage = error.message
        componentThis.props.handleError(errorMessage)
      })
  }
  storeUser = user => {
    postLambda('newAccount', user).then(res => {
      this.store()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          newsletter: user.newsletter,
          password: user.password,
          phone: '',
          orderHistory: [],
        })
        .then(() => {
          this.signIn(user.uid)
          navigateTo('/')
        })
    })
  }

  updateAccount = (user, firstName, lastName, email, phone) => {
    this.store()
      .collection('users')
      .doc(user.uid)
      .update({
        phone: phone,
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
  }
  updatePayment = (
    res,
    user,
    cart,
    total,
    city,
    state,
    address,
    apartment,
    zip,
    phone,
    newsletter
  ) => {
    this.store()
      .collection('users')
      .doc(user.uid)
      .update({
        orderHistory: [
          ...user.orderHistory,
          {
            cart: [...cart],
            placed: moment().format('MMMM Do YYYY'),
            total: total,
            orderNumber: parseInt(Math.random() * 1000),
          },
        ],
        newsletter: newsletter,
      })
  }
}

export default new Firebase()
