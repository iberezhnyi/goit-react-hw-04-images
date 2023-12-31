import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
