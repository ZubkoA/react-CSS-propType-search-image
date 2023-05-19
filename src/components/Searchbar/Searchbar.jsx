import { Component } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as AddIcon } from '../../icons/search-outline.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    value: '',
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value: value.toLowerCase() });
  };

  handleSubmit = e => {
    const { value } = this.state;

    e.preventDefault();
    if (value.trim() === '') {
      return toast.warn('Type in something');
    }
    this.props.handleSearch(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit">
            <AddIcon />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={value}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propType = {
  handleSearch: PropTypes.func.isRequired,
};
export default Searchbar;
