import PropTypes from "prop-types";

const DATA_TYPES = {
   data: PropTypes.arrayOf(
     PropTypes.shape({
       type: PropTypes.string.isRequired,
       name: PropTypes.string.isRequired,
       price: PropTypes.number.isRequired,
       text: PropTypes.string.isRequired,
       isLocked: PropTypes.bool.isRequired,
       image: PropTypes.string.isRequired,
     })
   ),
 };

 const URL = "https://norma.nomoreparties.space/api/ingredients"

 export {DATA_TYPES, URL}