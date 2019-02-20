import React, { Component } from "react";
import { connect } from "react-redux";
import { change, formValueSelector } from "redux-form";

import Icon from "~/components/Icon/Icon";
import CancelLink from "~/components/CancelLink/CancelLink";
import SiteSelect from "~/components/SiteSelect/SiteSelect";
import Button from "~/components/Button/Button";

import "./author-sites-list.scss";
import "./assets/cancel.svg";
import "./assets/add.svg";

class AuthorSitesList extends Component {
  state = {
    openAdd: false
  };

  handleRemove = event => {
    const { change, form, ids } = this.props;
    const { id } = event.currentTarget.dataset;
    const newSites = ids.filter(itemId => itemId.toString() !== id);
    change(form, "sites", newSites);
  };

  handleAdd = () => {
    const { siteId, ids, form, change } = this.props;
    const exists = Boolean(~ids.indexOf(siteId));

    if (!exists) {
      this.setState({ openAdd: false });
      change(form, "sites", [...ids, Number(siteId)]);
    }
  };

  handleAddOpen = () => this.setState({ openAdd: true });

  handleCancelClick = event => {
    event.preventDefault();
    this.setState({ openAdd: false });
  };

  renderItems = () => {
    const { ids, sitesData } = this.props;
    return ids.map(id => {
      const item = sitesData[id];
      return (
        <div
          key={item.id}
          data-id={item.id}
          className="author-sites-list__item"
        >
          {item.name}
          <button
            type="button"
            className="author-sites-list__remove"
            data-id={item.id}
            onClick={this.handleRemove}
          >
            <Icon name="cancel" className="author-sites-list__remove-icon" />
            Удалить журнал
          </button>
        </div>
      );
    });
  };

  render() {
    const { userId } = this.props;
    const { openAdd } = this.state;
    return (
      <div className="author-sites-list">
        <p className="author-sites-list__header">
          Журналы, в которые {userId ? "пользователь может" : "Вы можете"}{" "}
          писать статьи:
        </p>

        <div className="author-sites-list__content">{this.renderItems()}</div>

        <div className="author-sites-list__actions">
          {!openAdd ? (
            <button
              onClick={this.handleAddOpen}
              type="button"
              className="author-sites-list__add"
            >
              <Icon name="add" className="author-sites-list__add-icon" />
              Добавить другие журналы
            </button>
          ) : (
            <React.Fragment>
              <CancelLink onClick={this.handleCancelClick} />

              <div className="form">
                <div className="form__field form__field_small">
                  <label htmlFor="sites-list" className="form__label">
                    Выберите журнал:
                  </label>
                  <SiteSelect id="sites-list" />
                </div>
                <div className="form__field form__field_small">
                  <Button
                    onClick={this.handleAdd}
                    type="button"
                    className="button_small"
                  >
                    Добавить
                  </Button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>

        <hr className="page__divider" />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { form } = props;
  const { sites } = state;
  const selector = formValueSelector(form);
  const ids = selector(state, "sites") || [];

  return {
    ids,
    sitesData: sites.data,
    siteId: sites.current
  };
}

const mapDispatchToProps = {
  change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorSitesList);
