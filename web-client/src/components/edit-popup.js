import React from "react";

const confirmDelete = () => {
  return window.confirm("Are you sure you want to delete this entry?");
};

const EditPopup = (props) => {
  return (
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="staticBackdropLabel">
              Edit Entry
            </h2>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div className="row">
                <div className="col-sm-12 pt-1 pb-3 text-muted">
                  <label for="account-name">Account Name</label>
                  <small className="account-name-error text-danger pl-4"></small>
                  <input
                    className="form-control account-name"
                    type="text"
                    name="account-name"
                    placeholder="Account Name"
                    value={props.name}
                    required
                  />
                </div>

                <div className="col-sm-12 pt-1 pb-3 text-muted">
                  <label for="username">Username</label>
                  <small className="username-error text-danger pl-4"></small>
                  <input
                    className="form-control username"
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={props.username}
                    required
                  />
                </div>

                <div className="col-sm-12 pt-1 pb-5 text-muted">
                  <label for="password">Password</label>
                  <small className="password-error text-danger pl-4"></small>
                  <input
                    className="form-control password"
                    type="password"
                    name="name"
                    placeholder="Password"
                    value={props.password}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              onClick={() => {
                return confirmDelete();
              }}
              type="button"
              class="btn btn-link text-danger float-left"
            >
              Delete Entry
            </button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
