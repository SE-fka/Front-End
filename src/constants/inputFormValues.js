import * as yup from "yup";

// initial input fields
export const initialValues = {
    scrapingInterval: "",
    scrapingDuration: "",
    scrapingAccount: "",
};

// phone number input validation checking from string by regex pattern...
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


// user input validation logic for each input field 
export const checkoutSchema = yup.object().shape({
    scrapingInterval: yup.string().required("Required"),
    scrapingDuration: yup.string().required("Required"),
    scrapingAccount: yup.string().required("Required")
});