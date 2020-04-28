import React from "react";
import Modal from "react-modal";
import "./Writer.css";
import User from "../../interfaces/User.interface";
import Letter from "../../interfaces/Letter.interface";
import SentLetter from "../../interfaces/SentLetter.interface";
import FileUpload from "../file-upload/FileUpload";

const Web3 = require("web3");
export let web3: typeof Web3;

// need a dictionary to map letter id to letter
interface Dictionary<T> {
  [key: number]: T;
}

interface WriterState {
  letters: Letter[]; // from letter table
  sentLetters: SentLetter[]; // from sentLetter table
  modalIsOpen: boolean;
  letterKey: number;
}

class Writer extends React.Component<User, WriterState> {
  componentWillMount() {
    // for modal
    Modal.setAppElement("body");

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
            user_id: 103,
            name: "Curious George",
            public_key: "0x142857142857142857",
          },
          letter_uploaded: false,
        },
      ],
      sentLetters: [
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
          recipient: {
            user_id: 104,
            name: "Elton John",
            public_key: "0x101100101001101110100",
          },
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
          recipient: {
            user_id: 103,
            name: "Curious George",
            public_key: "0x142857142857142857",
          },
        },
      ],
    });
  }

  constructor(props: User) {
    super(props);
    this.state = {
      letters: [],
      sentLetters: [],
      modalIsOpen: false,
      letterKey: -1,
    };
  }

  /**
   * when upload button is clicked
   * @param event mouse click of upload button
   * @param key letter id
   */
  onUploadClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number
  ) {
    // open upload modal
    this.openUploadModal(key);
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

  /**
   * opens upload modal
   * @param key letter id
   */
  openUploadModal(key: number) {
    this.setState({ modalIsOpen: true, letterKey: key });
  }

  /**
   * close upload modal by setting modal state to false
   */
  closeUploadModal() {
    this.setState({ modalIsOpen: false });
  }

  /**
   * callback for when uploaded file is submitted
   * closes modal
   * @param file letter as a FormData object
   */
  onUploadSubmit(file: FormData) {
    this.closeUploadModal();
    // console.log(this.state.letterKey);
    // console.log(file);
    // send letter to backend
  }

  render() {
    const { name, public_key, user_id } = this.props;
    const { letters, sentLetters, modalIsOpen, letterKey } = this.state;

    // letter list
    const lettersList = letters.map((l, key) => (
      <div key={l.letter_id}>
        <p>
          <span>({l.letter_id})&nbsp;</span>
          <span>For: {l.requester.name} </span>

          <button
            style={{ marginLeft: "10px", float: "right" }}
            onClick={(e) => {
              this.onViewClick(e, l.letter_id);
            }}
          >
            view
          </button>

          <button
            style={{ marginLeft: "10px", float: "right" }}
            onClick={(e) => {
              this.onUploadClick(e, l.letter_id);
            }}
          >
            upload
          </button>
        </p>
      </div>
    ));

    // sentLetter list
    const sentLettersList = sentLetters.map((l, key) => (
      <div key={l.letter_id + "x" + l.recipient.user_id}>
        <p>
          <span>({l.letter_id})&nbsp;</span>
          <span>For: {l.requester.name}</span>

          <button
            style={{ marginLeft: "10px", float: "right" }}
            onClick={(e) => {
              this.onViewClick(e, l.letter_id);
            }}
          >
            view
          </button>
          <span style={{ float: "right" }}>To: {l.recipient.name}</span>
        </p>
      </div>
    ));

    return (
      <div id="writer" className="writer">
        <div className="writer-header">
          <h1> Writer Page </h1>
          <p>
            <em>{name}</em>
          </p>
          <hr></hr>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeUploadModal.bind(this)}
          contentLabel="Upload Modal"
        >
          <FileUpload callback={this.onUploadSubmit.bind(this)}></FileUpload>
        </Modal>

        <div className="letters">
          <h3> Letters </h3>
          <div>{lettersList}</div>
          <hr></hr>
        </div>

        <div className="sentLetters">
          <h3> History </h3>
          <div>{sentLettersList}</div>
          <hr></hr>
        </div>

        <div className="writer-footer">
          <p> Product of Team Gas</p>
        </div>
      </div>
    );
  }
}
export default Writer;
