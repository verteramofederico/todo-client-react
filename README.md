# Client - React front in todo app

httpclient: Axios
State: redux
Store: Redux Toolkit
Router: react-router-dom
Form validations: Formik
Loader: react-loader-spinner
Alerts: SweetAlert2
Styles: bootstrap and css

Functions:
home(./) is only accessible to registered users. If the app does not find the user in localstorage, it redirects you to register. Once logged in, the / register or / login routes are no longer accessible until you are logged out. 
Once logged in you can add tasks. You can complete them as marked or delete them. The buttons vary according to their state.