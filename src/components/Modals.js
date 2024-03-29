import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/react/solid";
import {
  ArchiveIcon,
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  ClipboardCheckIcon,
  ClockIcon,
  EyeIcon,
  PaperClipIcon,
  PlusIcon,
  SelectorIcon,
  ShareIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import {
  Col,
  Row,
  Form,
  Modal,
  Button,
  InputGroup,
  Image,
  Badge,
  FloatingLabel,
  Table,
} from "react-bootstrap";

import { Routes } from "routes";


import { v4 as uuidv4 } from "uuid";

import { usePizzly } from "services/contextPizzly";

import ApplicationAvatar from "components/ApplicationAvatar";
import { Members as BoardMembers, Labels as BoardLabels } from "data/application";

import { PageTrafficTable } from "components/Tables";
import { useHistory } from "react-router-dom";

const pageVisits = [
  {
    id: uuidv4(),
    views: 4.525,
    returnValue: 255,
    bounceRate: 42.55,
    pageName: "/user/@me",
  },
  {
    id: uuidv4(),
    views: 2.987,
    returnValue: 139,
    bounceRate: -43.52,
    pageName: "/user/group",
  },
  {
    id: uuidv4(),
    views: 2.844,
    returnValue: 124,
    bounceRate: -32.35,
    pageName: "/channel/id",
  },
  {
    id: uuidv4(),
    views: 1.22,
    returnValue: 55,
    bounceRate: 15.78,
    pageName: "/guild/everyone",
  },
  {
    id: uuidv4(),
    views: 505,
    returnValue: 3,
    bounceRate: -75.12,
    pageName: "/user/id",
  },
];

export const EventModal = (props) => {
  const [title, setTitle] = useState(props.title);
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);

  const { show = false, edit = false, id } = props;
  const startDate = start
    ? moment(start).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const endDate = end
    ? moment(end).format("YYYY-MM-DD")
    : moment(start).format("YYYY-MM-DD");

  const onTitleChange = (e) => setTitle(e.target.value);

  const onConfirm = () => {
    const sameDay = startDate === endDate;
    const finalStart = sameDay
      ? moment(startDate).toDate()
      : moment(startDate).startOf("day").toDate();
    const finalEnd = sameDay ? null : moment(endDate).endOf("day").toDate();
    const payload = { id, title, sameDay, start: finalStart, end: finalEnd };

    if (edit) {
      return props.onUpdate && props.onUpdate(payload);
    }

    return props.onAdd && props.onAdd(payload);
  };
  const onDelete = () => edit && props.onDelete && props.onDelete(id);
  const onHide = () => props.onHide && props.onHide();

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content">
        <Modal.Body>
          <Form.Group id="title" className="mb-4">
            <Form.Label>Event title</Form.Label>
            <Form.Control
              required
              autoFocus
              type="text"
              value={title}
              onChange={onTitleChange}
            />
          </Form.Group>
          <Row>
            <Col xs={12} lg={6}>
              <Form.Group id="startDate">
                <Form.Label>Select start date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setStart}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={startDate}
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col xs={12} lg={6}>
              <Form.Group id="endDate" className="mb-2">
                <Form.Label>Select end date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setEnd}
                  isValidDate={(currDate) => currDate.isSameOrAfter(start)}
                  initialViewDate={end || start}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <CalendarIcon className="icon icon-xs" />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="YYYY-MM-DD"
                        value={endDate}
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="me-2" onClick={onConfirm}>
            {edit ? "Update event" : "Add new event"}
          </Button>

          {edit ? (
            <Button variant="danger" onClick={onDelete}>
              Delete event
            </Button>
          ) : null}

          <Button variant="link" className="text-gray ms-auto" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const ApplicationCreateModal = (props) => {
  const { modalTitle = "Add a new card", type = "card", show = false } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onHide = () => props.onHide && props.onHide();

  const onSubmit = () => {
    const payload = { title, description };
    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <h5 as={Modal.Title} className="fw-normal">
            {modalTitle}
          </h5>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group id="title" className="mb-3">
            <Form.Control
              required
              autoFocus
              type="text"
              value={title}
              onChange={onTitleChange}
              placeholder={`Enter a title for this ${type}…`}
            />
          </Form.Group>
          {type === "card" && (
            <Form.Group id="description" className="mb-3">
              <Form.Control
                required
                autoFocus
                multiple
                as="textarea"
                value={description}
                onChange={onDescriptionChange}
                placeholder={`Enter a description for this ${type}…`}
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pt-0">
          <Button variant="outline-gray-500" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="secondary"
            className="d-inline-flex align-items-center"
            onClick={onSubmit}
          >
            <PlusIcon className="icon icon-xs me-2" />
            Add {type}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const ApplicationCopyModal = (props) => {
  const { type = "card", show = false, lists = [], ...otherProps } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [listId, setListId] = useState(props.listId ?? "");

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const payload = { ...otherProps, title, listId };
    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <Modal.Title className="fw-normal">Copy {type}</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form.Group id="title" className="mb-3">
            <Form.Control
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Form.Group>
          {type === "card" && (
            <FloatingLabel id="list" label="Copy to list.." className="mb-3">
              <Form.Select
                value={listId}
                onChange={(e) => setListId(e.target.value)}
              >
                {lists.map((l) => (
                  <option value={l.id} key={`copy-card-option-${l.id}`}>
                    {l.title}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pt-0">
          <Button
            variant="secondary"
            className="d-inline-flex align-items-center"
            onClick={onSubmit}
          >
            <PlusIcon className="icon icon-xs me-2" />
            Create {type}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const ApplicationMoveModal = (props) => {
  const { type = "card", show = false, lists = [] } = props;
  const [listId, setListId] = useState(props.listId ?? "");
  const [index, setIndex] = useState(props.index ?? 0);
  const cardList = lists.find((l) => l.id === listId);
  const { myDiscordAPI, authId, profile, setProfile } = usePizzly();
  const [fetchCalled, setFetchCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();


  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const source = { droppableId: props.listId, index: props.index };
    const destination = { droppableId: listId, index };

    props.onSubmit && props.onSubmit({ source, destination });
  };

  const goToUsers = () => {
    history.push(Routes.Users.path);
  }

  useEffect(() => {
    const fetchProfile = async () => {
      await myDiscordAPI
        .auth(authId)
        .get("/users/@me")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setProfile(json);
        });
    };

    fetchProfile();
  }, []);



  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="pb-0 border-0">
          <Modal.Title className="fw-normal">/user/@me</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>
        <Modal.Body className="pb-0">
          {isLoading ? <div> </div> : 
          <ul>
            {JSON.stringify(profile, null, " ")}

          </ul>}
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pt-0">
          <Button
            variant="secondary"
            className="d-inline-flex align-items-center"
            onClick={() => {
              setIsLoading(false);
            }}
          >
            Fetch Data
          </Button>
          {!isLoading &&
            <Button
              variant="secondary"
              className="d-inline-flex align-items-right"
              style={{
                float: "right"
                }}
              onClick={goToUsers}
            >
              Share
            </Button>
}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

// This Modal is from after the Click
export const ApplicationEditModal = (props) => {
  const {
    id: cardId,
    index,
    listId,
    show = false,
    author,
    members = [],
    labels = [],
    comments = [],
  } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [image, setImage] = useState(props.image ?? "");
  const [comment, setComment] = useState("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onChange = () => {
    const payload = { listId, cardId, title };

    if (title !== props.title) {
      props.onChange && props.onChange(payload);
    }

    toggleIsTitleEditable();
  };

  const onEditMembers = () => {
    props.onEditMembers && props.onEditMembers(props);
  };

  const onEditLabels = () => {
    props.onEditLabels && props.onEditLabels(props);
  };

  const onArchive = () => {
    props.onArchive && props.onArchive({ cardId, listId });
  };

  const onMove = () => {
    props.onMove && props.onMove({ listId, index });
  };

  const onWatch = () => {};

  const onConnect = () => {
    props.onConnect && props.onConnect();
  };

  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const BounceIcon = bounceRate < 0 ? ArrowNarrowDownIcon : ArrowNarrowUpIcon;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr className="border-bottom">
        <th className="text-gray-900" scope="row">
          <Button variant="white" onClick={onMove}>{pageName}</Button>
        </th>
        <td className="fw-bolder text-gray-500">{views}</td>
        <td className="fw-bolder text-gray-500">${returnValue}</td>
        <td className="fw-bolder text-gray-500">
          <div className="d-flex align-items-center">
            <BounceIcon className={`icon icon-xs ${bounceTxtColor} me-2`} />
            {Math.abs(bounceRate)}%
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Modal as={Modal.Dialog} centered size="xl" show={show} onHide={onHide}>
      <Form className="modal-content p-lg-3">
        <Modal.Header className="align-items-start border-bottom">
          <div className="d-block">
            {isTitleEditable ? (
              <Form.Group id="title" className="mb-3">
                <Form.Control
                  required
                  autoFocus
                  value={title}
                  className="text-gray-900 fs-5 fw-bold border-0 px-1 py-0 m-0"
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={onChange}
                />
              </Form.Group>
            ) : (
              <div>
                {/* <h5 className="text-gray-900 fs-5 fw-bold py-1 ps-1 mb-3" onClick={toggleIsTitleEditable}> */}
                <Image
                  rounded
                  src={image}
                  className="image-md justify-center"
                />
              </div>
            )}

            <div className="d-flex">
              <div className="d-block me-3 me-sm-4">
                <h5 className="fs-6 fw-bold text-gray-500">Members</h5>
                <div className="d-flex align-items-center">
                  {members.map((m) => (
                    <ApplicationAvatar key={`application-avatar-${m.id}`} {...m} />
                  ))}

                  <Button
                    variant="gray-200"
                    size="sm"
                    className="d-inline-flex align-items-center px-3 ms-1"
                    onClick={onEditMembers}
                  >
                    <PlusIcon className="icon icon-xs" />
                  </Button>
                </div>
              </div>
              {/* <div className="d-block me-3">
                <h5 className="fs-6 fw-bold text-gray-500">Labels</h5>
                <div className="d-flex align-items-center">
                  {labels.map(l => (
                    <Badge text="white" bg={l.color} key={`application-label-${l.id}`} className="rounded py-2 px-3">
                      {l.name}
                    </Badge>
                  ))}

                  <Button variant="gray-200" size="sm" className="d-inline-flex align-items-center px-3 ms-1" onClick={onEditLabels}>
                    <PlusIcon className="icon icon-xs" />
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="py-4">
          <Row>
            <Col xs={12} lg={9}>
              <Row className="mb-4">
                <Col xs="auto">
                  <div className="border border-3 rounded mb-2">
                    <Image rounded src={author.image} className="image-sm" />
                  </div>
                  <div className="text-center">
                    <PaperClipIcon className="icon icon-xs me-2" />
                    <CameraIcon className="icon icon-xs" />
                  </div>
                </Col>
                <Col>
                  <Form.Group id="comment">
                    <Form.Control
                      multiple
                      rows={3}
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Leave a comment"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4 mb-lg-0">
                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th className="border-bottom" scope="col">
                        Api Name
                      </th>
                      <th className="border-bottom" scope="col">
                        Page Views
                      </th>
                      <th className="border-bottom" scope="col">
                        Page Value
                      </th>
                      <th className="border-bottom" scope="col">
                        Bounce rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {pageVisits.map((pv) => (
                      <TableRow key={`page-visit-${pv.id}`} {...pv}/>
                    ))}
                  </tbody>
                </Table>
              </Row>
              {/* <Row className="mb-4 mb-lg-0">
                {comments.map((c) => (
                  <Col xs={12} key={`application-comment-${c.id}`} className="mb-4">
                    <div className="bg-gray-50 border border-gray-100 rounded p-3">
                      <div className="d-flex align-items-center mb-2">
                        <h3 className="fs-6 mb-0 me-3">{c.sender}</h3>
                        <small>{moment(c.timeSent).fromNow()}</small>
                      </div>
                      <p className="text-dark mb-1">{c.message}</p>
                      <small className="hover:underline text-gray-700 me-1">
                        Edit
                      </small>
                      &middot;
                      <small className="hover:underline text-gray-700 ms-1">
                        Delete
                      </small>
                    </div>
                  </Col>
                ))}
              </Row> */}
            </Col>
            <Col xs={12} lg={3}>
              <div className="d-grid gap-2">
                <Button
                  variant="gray-200"
                  size="sm"
                  className="d-inline-flex align-items-center rounded py-2 ps-3 text-start"
                  onClick={onEditMembers}
                >
                  <UserGroupIcon className="icon icon-xs text-gray-500 me-2" />
                  Members
                </Button>
                <Button
                  variant="gray-200"
                  size="sm"
                  className="d-inline-flex align-items-center rounded py-2 ps-3 text-start"
                  onClick={onEditLabels}
                >
                  <TagIcon className="icon icon-xs text-gray-500 me-2" />
                  Labels
                </Button>
                <Button
                  variant="gray-200"
                  size="sm"
                  className="d-inline-flex align-items-center rounded py-2 ps-3 text-start"
                >
                  <ClipboardCheckIcon className="icon icon-xs text-gray-500 me-2" />
                  Checklist
                </Button>
                <Button
                  variant="gray-200"
                  size="sm"
                  className="d-inline-flex align-items-center rounded py-2 ps-3 text-start"
                >
                  <PaperClipIcon className="icon icon-xs text-gray-500 me-2" />
                  Attachment
                </Button>
                <Button
                  variant="gray-200"
                  size="sm"
                  className="d-inline-flex align-items-center rounded py-2 ps-3 text-start"
                >
                  <ClockIcon className="icon icon-xs text-gray-500 me-2" />
                  Due Date
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="justify-content-start border-top">
          <Button
            variant="gray-800"
            className="me-2 text-start"
            onClick={onMove}
          >
            <SelectorIcon className="icon icon-xs me-2" />
            Move
          </Button>
          <Button
            variant="gray-800"
            className="me-2 text-start"
            onClick={onArchive}
          >
            <ArchiveIcon className="icon icon-xs me-2" />
            Archive
          </Button>
          <Button
            variant="gray-800"
            className="me-2 text-start"
            onClick={onWatch}
          >
            <EyeIcon className="icon icon-xs me-2" />
            Watch
          </Button>

          <Button variant="gray-800" className="me-2 text-start">
            <ShareIcon className="icon icon-xs me-2" />
            Share
          </Button>
          {/* Pizzly Integration Discord connection */}
          <Button
            variant="gray-800"
            className="me-2 text-start"
            onClick={onConnect}
          >
            <ShareIcon className="icon icon-xs me-2" />
            Connect
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const ApplicationEditMembersModal = (props) => {
  const { listId, id: cardId, show = false, members = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardMembers, setBoardMembers] = useState(
    BoardMembers.map((bm) => ({
      ...bm,
      show: true,
      isAssignedToCard: members.some((m) => m.id === bm.id),
    }))
  );

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardMembers.map((bm) => ({
      ...bm,
      show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()),
    }));

    setSearchValue(newSearchValue);
    setBoardMembers(searchResults);
  };

  const onMemberClick = (id) => {
    const boardMembersUpdated = boardMembers.map((m) =>
      m.id === id ? { ...m, isAssignedToCard: !m.isAssignedToCard } : m
    );
    setBoardMembers(boardMembersUpdated);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const membersSelected = boardMembers.filter((m) => m.isAssignedToCard);
    const payload = { listId, cardId, members: membersSelected };

    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal as={Modal.Dialog} centered scrollable show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="border-0 px-3 pb-0">
          <Modal.Title className="fw-normal">Members</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search board members.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3">
            {boardMembers
              .filter((m) => m.show)
              .map((m) => (
                <Row
                  key={`board-member-${m.id}`}
                  className="application-card-member border-bottom py-2"
                  onClick={() => onMemberClick(m.id)}
                >
                  <Col xs={2}>
                    <Image src={m.image} className="avatar-md rounded-circle" />
                  </Col>
                  <Col
                    xs={8}
                    className="d-flex align-items-center justify-content-start"
                  >
                    <h4 className="fs-6 text-dark mb-0">{m.name}</h4>
                  </Col>
                  {m.isAssignedToCard && (
                    <Col xs={2} className="d-flex align-items-center">
                      <CheckIcon className="icon icon-sm text-success" />
                    </Col>
                  )}
                </Row>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pb-0">
          <Button
            variant="secondary"
            className="d-inline-flex align-items-center"
            onClick={onSubmit}
          >
            Confirm members
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const ApplicationEditLabelsModal = (props) => {
  const { listId, id: cardId, show = false, labels = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardLabels, setBoardLabels] = useState(
    BoardLabels.map((bm) => ({
      ...bm,
      show: true,
      isAssignedToCard: labels.some((m) => m.id === bm.id),
    }))
  );

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardLabels.map((bm) => ({
      ...bm,
      show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()),
    }));

    setSearchValue(newSearchValue);
    setBoardLabels(searchResults);
  };

  const onLabelClick = (id) => {
    const boardLabelsUpdated = boardLabels.map((m) =>
      m.id === id ? { ...m, isAssignedToCard: !m.isAssignedToCard } : m
    );
    setBoardLabels(boardLabelsUpdated);

    const labelsSelected = boardLabelsUpdated.filter((l) => l.isAssignedToCard);
    const payload = { listId, cardId, labels: labelsSelected };
    props.onSubmit && props.onSubmit(payload);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  return (
    <Modal as={Modal.Dialog} centered scrollable show={show} onHide={onHide}>
      <Form className="modal-content p-3">
        <Modal.Header className="border-0 px-3 pb-0">
          <Modal.Title className="fw-normal">Labels</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search labels.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3 py-2">
            {boardLabels
              .filter((l) => l.show)
              .map((l) => (
                <Row key={`label-${l.id}`} className="my-1">
                  <Badge
                    bg={l.color}
                    className="application-card-label py-2 px-3"
                    onClick={() => onLabelClick(l.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="fs-6 text-white mb-0">{l.name}</h4>
                      {l.isAssignedToCard && (
                        <CheckIcon className="icon icon-sm" />
                      )}
                    </div>
                  </Badge>
                </Row>
              ))}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
