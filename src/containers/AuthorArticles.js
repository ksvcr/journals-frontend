import React, {Component, Fragment} from 'react';
import Menu from '~/components/Menu/Menu';
import Select from '~/components/Select/Select';
import Radio from '~/components/Radio/Radio';
import SearchField from '~/components/SearchField/SearchField';

class AuthorArticles extends Component {
  get menuItems() {
    return [
      {
        title: 'Мои статьи',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/'
      }
    ];
  }

  get journalsOptions() {
    return [
      {
        title: 'Международный научно-исследовательский',
        value: '1'
      },
      {
        title: 'Международный научно-исследовательский',
        value: '2'
      }
    ];
  }

  render() {
    return (
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <div className="form">
            <div className="form__field">
              <label htmlFor="journals-list" className="form__label">Для журнала</label>
              <Select id="journals-list" options={ this.journalsOptions } />
            </div>
            <div className="form__field">
              <label htmlFor="journals-list" className="form__label">Поиск статьи</label>
              <Radio name="search" label="Искать везде" checked />
              <Radio name="search" label="Искать в заголовках" />
              <SearchField />
            </div>
          </div>
        </article>
      </Fragment>
    );
  }
}

export default AuthorArticles;
