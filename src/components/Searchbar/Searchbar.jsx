import { Component } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as AddIcon } from '../icons/search-outline.svg';

class Searchbar extends Component {
  state = {
    value: '',
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    const { value } = this.state;

    e.preventDefault();
    console.log(this.state);
    this.props.handleSearch(value);
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit">
            <AddIcon />
          </button>

          <input
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
