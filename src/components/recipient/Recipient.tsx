import React from "react";
import User from "../../interfaces/User.interface";
import Letter from "../../interfaces/Letter.interface";
import "./Recipient.css";

const Web3 = require("web3");
export let web3: typeof Web3;

interface RecipientState {
  letters: Letter[];
}

class Recipient extends React.Component<User, RecipientState> {
  componentWillMount() {
    // TODO: make api call to get letters

    // sample data
    this.setState({
      letters: [
        {
          letter_id: 1,
          writer: {
            user_id: 101,
            name: "Mary Poppins",
            public_key: "0x314159265358979323",
          },
          requester: {
            user_id: 102,
            name: "Simba",
            public_key: "0xabcdefghijklmnop",
          },
          letter_uploaded: false,
        },
        {
          letter_id: 2,
          writer: {
            user_id: 101,
            name: "Mary Poppins",
            public_key: "0x314159265358979323",
          },
          requester: {
            user_id: 102,
            name: "Simba",
            public_key: "0xabcdefghijklmnop",
          },
          letter_uploaded: false,
        },
      ],
    });
  }

  constructor(props: User) {
    super(props);
    this.state = {
      letters: [],
    };
  }

  /**
   * when view button is clicked
   * @param event mouse click of view button
   * @param key letter id
   */
  onViewClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number
  ) {
    // TODO: open view modal
  }

  render() {
    const { name, public_key, user_id } = this.props;
    const { letters } = this.state;

    // letter list
    const lettersList = letters.map((l, key) => (
      <div key={l.letter_id}>
        <p>
          <span>({l.letter_id})&nbsp;</span>
          <span>For: {l.requester.name} </span>
          <button
            style={{ marginLeft: "10px", float: "right" }}
            onClick={(e) => {
              // this.onViewClick(e, l.letter_id);
            }}
          >
            view
          </button>
          <span className="from">From: {l.writer.name}</span>
        </p>
      </div>
    ));
    return (
      <div className="recipient">
        <div className="recipient-header">
          <h1> Recipient Page </h1>
          <p>
            <em>{name}</em>
          </p>
          <hr></hr>
        </div>

        <div className="letters">
          <h3> Letters </h3>
          <div>{lettersList}</div>
          <hr></hr>
        </div>

        <div className="recipient-footer">
          <p> Product of Team Gas</p>
        </div>
      </div>
    );
  }
}
export default Recipient;
