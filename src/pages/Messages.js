import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from "react-router-dom";
import { ArchiveIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MailIcon, MailOpenIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Col, Row, Button, Dropdown, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { MessageCardWidget } from "components/Widgets";
import { Routes } from "routes";
import { useOrbis } from "services/context";
// import MESSAGES_DATA from "data/messages";

const ArchiveIconHtml = ReactDOMServer.renderToString(
  <ArchiveIcon className="h-50 w-auto" />
);

const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-gray'
  },
  buttonsStyling: false
}));

export default () => {
  const messageRef = useRef([]);
  const { messageService: { loadConversations, conversations, setConversations, setConversation } } = useOrbis();
  const selectedMessageIds = conversations.filter(m => m.isSelected).map(m => m.id);

  useEffect(() => {
    loadConversations();
    // data ? setConversations(data) : setConversations([]);
    // console.log(data)
      // if (conversations !== undefined) {
      // messageRef.current = conversations;
      // console.log({
      //   conversations,
      //   messageRef
      // })
    // }
  }, []);
  // const { messageService: { messages, setMessages } } = useOrbis();
  // const selectedMessageIds = messages.filter(m => m.isSelected).map(m => m.id);

  const disableMenu = selectedMessageIds.length === 0;

  const selectMessage = (id) => {
    const newMessages = conversations.map(m => {
      const isSelected = m.id === id ? !m.isSelected : m.isSelected;
      return { ...m, isSelected };
    });

    setConversation(newMessages);
  };

  const toggleFavorite = (id) => {
    setConversations(conversations.map(m => m.id === id ? { ...m, favorite: !m.favorite } : m));
  };

  const toggleReadStatus = (id) => {
    setConversations(conversations.map(m => m.id === id ? { ...m, read: !m.read } : m));
  };

  const markSelectedMessagesAsUnread = () => {
    const newMessages = conversations.map(m => selectedMessageIds.includes(m.id) ? { ...m, read: false } : m);
    setConversations(newMessages);
  };

  const markSelectedMessagesAsRead = () => {
    const newMessages = conversations.map(m => selectedMessageIds.includes(m.id) ? { ...m, read: true } : m);
    setConversations(newMessages);
  };

  const deleteMessages = async (ids) => {
    const conversationsNr = ids.length;
    const textMessage = conversationsNr === 1
      ? "Are you sure do you want to delete this message?"
      : `Are you sure do you want to delete these ${conversationsNr} conversations?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const newMessages = conversations.filter(f => !ids.includes(f.id));
      const confirmMessage = conversationsNr === 1 ? "The message has been deleted." : "The conversations have been deleted.";

      setConversations(newMessages);
      await SwalWithBootstrapButtons.fire('Deleted', confirmMessage, 'success');
    }
  };

  const archiveMessages = async (ids) => {
    const conversationsNr = ids.length;
    const textMessage = conversationsNr === 1
      ? "Are you sure do you want to archive this message?"
      : `Are you sure do you want to archive these ${conversationsNr} conversations?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      iconHtml: ArchiveIconHtml,
      title: "Confirm archivation",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const newMessages = conversations.filter(f => !ids.includes(f.id));
      const confirmMessage = conversationsNr === 1 ? "The message has been archived." : "The conversations were archived.";

      setConversations(newMessages);
      await SwalWithBootstrapButtons.fire('Archived', confirmMessage, 'success');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pb-2 pt-4 pb-md-4">
        <div>
          <Button as={Link} to={Routes.SingleMessage.path} variant="secondary" className="d-inline-flex align-items-center mb-3 mb-md-0">
            <PencilAltIcon className="icon icon-xs me-2" />
            Compose
          </Button>
        </div>
        <div className="d-block d-sm-flex">
          <ButtonGroup className="mb-3 me-3 mb-md-0 d-none d-md-inline-flex">
            <OverlayTrigger placement="bottom" overlay={<Tooltip className="m-0">Mark as Unread</Tooltip>}>
              <Button variant="gray-800" disabled={disableMenu} onClick={markSelectedMessagesAsUnread} >
                <MailIcon className="icon icon-xs text-white" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip className="m-0">Archive</Tooltip>}>
              <Button variant="gray-800" disabled={disableMenu} onClick={() => archiveMessages(selectedMessageIds)}>
                <ArchiveIcon className="icon icon-xs text-white" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip className="m-0">Delete</Tooltip>}>
              <Button variant="gray-800" disabled={disableMenu} onClick={() => deleteMessages(selectedMessageIds)}>
                <TrashIcon className="icon icon-xs text-white" />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>

          <Dropdown className="mb-3 mb-md-0">
            <Dropdown.Toggle as={Button} variant="gray-800" className="d-inline-flex alignpitems-center arrow-none" disabled={disableMenu}>
              More <ChevronDownIcon className="icon icon-xs ms-1" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-start mt-2 py-1">
              <Dropdown.Item className="d-flex align-items-center" onClick={() => archiveMessages(selectedMessageIds)}>
                <ArchiveIcon className="icon icon-xs text-gray-400 me-2" />
                Archive
              </Dropdown.Item>
              <Dropdown.Item className="d-flex align-items-center" onClick={markSelectedMessagesAsRead}>
                <MailOpenIcon className="icon icon-xs text-gray-400 me-2" />
                Mark as read
              </Dropdown.Item>
              <Dropdown.Item className="d-flex align-items-center">
                <ClockIcon className="icon icon-xs text-gray-400 me-2" />
                Snooze
              </Dropdown.Item>

              <Dropdown.Divider as="div" className="my-1" />

              <Dropdown.Item className="d-flex align-items-center" onClick={() => deleteMessages(selectedMessageIds)}>
                <TrashIcon className="icon icon-xs text-danger me-2" />
                Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="message-wrapper border-0 bg-white shadow rounded mb-4">
        {conversations.map(m => {
          return <MessageCardWidget
            {...m}
            key={`message-${m.stream_id}`}
            selectMessage={(stream_id) => setConversation(stream_id)}
            toggleFavorite={toggleFavorite}
            toggleReadStatus={toggleReadStatus}
            archiveMessage={stream_id => archiveMessages([stream_id])}
            deleteMessage={stream_id => deleteMessages([stream_id])}
          />
        })}

        <Row className="p-4">
          <Col xs={7} className="mt-1">
            Showing 1 - {conversations.length} of 289
          </Col>
          <Col xs={5}>
            <ButtonGroup className="float-end">
              <Button variant="gray-100" size="lg">
                <ChevronLeftIcon className="icon icon-xs" />
              </Button>
              <Button variant="gray-800" size="lg">
                <ChevronRightIcon className="icon icon-xs" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};
