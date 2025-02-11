import Image from 'next/image';
import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { FaCameraRetro, FaPlus } from 'react-icons/fa';
import GlightBox from '@/components/GlightBox';
import { getAllMedia } from '@/helpers/data';
import { toAlphaNumber } from '@/utils/change-casing';
import { BsBookmark, BsBookmarkCheck, BsChatFill, BsChatLeftTextFill, BsEnvelope, BsFlag, BsHandThumbsUpFill, BsHeartFill, BsLink, BsPencilSquare, BsPersonX, BsReplyFill, BsShare, BsSlashCircle, BsThreeDots, BsXCircle } from 'react-icons/bs';
import Link from 'next/link';
import avatar4 from '@/assets/images/avatar/04.jpg';
import avatar5 from '@/assets/images/avatar/05.jpg';
export const metadata = {
  title: 'Media'
};
const Media = async () => {
  const mediaData = await getAllMedia();
  return <Card>
      <CardHeader className="d-sm-flex align-items-center justify-content-between border-0 pb-0">
        <h5 className="card-title">Photos</h5>
        <Button variant="primary-soft" size="sm" data-bs-toggle="modal" data-bs-target="#modalCreateAlbum">
          {' '}
          <FaPlus className="fa-solid  pe-1" /> Create album
        </Button>
      </CardHeader>
      <CardBody>
        <Row className="g-3">
          <Col sm={6} md={4} lg={3}>
            <div className="border border-2 py-5 border-dashed h-100 rounded text-center d-flex align-items-center justify-content-center position-relative">
              <Link className="stretched-link" href="">
                <FaCameraRetro className="fs-1" />
                <h6 className="mt-2">Add photo</h6>
              </Link>
            </div>
          </Col>
          {mediaData.map((media, idx) => <Col sm={6} md={4} lg={3} key={idx}>
              <GlightBox href={media.image.src} data-gallery="image-popup" data-glightbox="description: .custom-desc2; descPosition: left;">
                <Image className="rounded img-fluid" src={media.image} alt="" />
              </GlightBox>
              <ul className="nav nav-stack py-2 small">
                <li className="nav-item">
                  <Link className="nav-link" href="">
                    {' '}
                    <BsHeartFill size={18} className="text-danger pe-1" />
                    {toAlphaNumber(media.likes)}{' '}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="">
                    {' '}
                    <BsChatLeftTextFill size={18} className="pe-1" />
                    {toAlphaNumber(media.comments)}
                  </Link>
                </li>
              </ul>
              <div className="glightbox-desc custom-desc2 z-5">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="avatar me-2">
                      <Image className="avatar-img rounded-circle" src={avatar4} alt="image" />
                    </div>
                    <div>
                      <div className="nav nav-divider">
                        <h6 className="nav-item card-title mb-0">Lori Ferguson</h6>
                        <span className="nav-item small"> 2hr</span>
                      </div>
                      <p className="mb-0 small">Web Developer at Webestica</p>
                    </div>
                  </div>
                  <Dropdown>
                    <DropdownToggle as="a" className="content-none text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                      <BsThreeDots />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardFeedAction">
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsBookmark className="fa-fw pe-2" />
                          Save post
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsPersonX className="fa-fw pe-2" />
                          Unfollow lori ferguson{' '}
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsXCircle className="fa-fw pe-2" />
                          Hide post
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsSlashCircle className="fa-fw pe-2" />
                          Block
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownDivider />
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsFlag className="fa-fw pe-2" />
                          Report post
                        </DropdownItem>
                      </li>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <p className="mt-3 mb-0">
                  I&apos;m so privileged to be involved in the @bootstrap hiring process! <Link href="">#internship #inclusivebusiness</Link>{' '}
                  <Link href="">#internship</Link> <Link href=""> #hiring</Link> <Link href="">#apply</Link>{' '}
                </p>
                <ul className="nav nav-stack py-3 small">
                  <li className="nav-item">
                    <Link className="nav-link active" href="">
                      {' '}
                      <BsHandThumbsUpFill className="pe-1" />
                      Liked (56)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="">
                      {' '}
                      <BsChatFill className="pe-1" />
                      Comments (12)
                    </Link>
                  </li>
                  <Dropdown className="nav-item ms-auto">
                    <DropdownToggle as="a" className="nav-link mb-0 content-none" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
                      <BsReplyFill className="fa-flip-horizontal pe-1" />
                      Share (3)
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end" aria-labelledby="cardShareAction">
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsEnvelope className="fa-fw pe-2" />
                          Send via Direct Message
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsBookmarkCheck className="fa-fw pe-2" />
                          Bookmark{' '}
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsLink className="fa-fw pe-2" />
                          Copy link to post
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsShare className="fa-fw pe-2" />
                          Share post via …
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownDivider />
                      </li>
                      <li>
                        <DropdownItem href="">
                          {' '}
                          <BsPencilSquare className="fa-fw pe-2" />
                          Share to News Feed
                        </DropdownItem>
                      </li>
                    </DropdownMenu>
                  </Dropdown>
                </ul>
                <div className="d-flex mb-3">
                  <div className="avatar avatar-xs me-2">
                    <Image className="avatar-img rounded-circle" src={avatar4} alt="" />
                  </div>
                  <form className="position-relative w-100">
                    <textarea className="one form-control pe-4 bg-light" data-autoresize rows={1} placeholder="Add a comment..." defaultValue={''} />
                    <div className="position-absolute top-0 end-0">
                      <button className="btn" type="button">
                        🙂
                      </button>
                    </div>
                  </form>
                </div>
                <ul className="comment-wrap list-unstyled ">
                  <li className="comment-item">
                    <div className="d-flex">
                      <div className="avatar avatar-xs">
                        <Image className="avatar-img rounded-circle" src={avatar5} alt="" />
                      </div>
                      <div className="ms-2">
                        <div className="bg-light rounded-start-top-0 p-3 rounded">
                          <div className="d-flex justify-content-center">
                            <div className="me-2">
                              <h6 className="mb-1">
                                {' '}
                                <Link href=""> Frances Guerrero </Link>
                              </h6>
                              <p className="small mb-0">Removed demands expense account in outward tedious do.</p>
                            </div>
                            <small>5hr</small>
                          </div>
                        </div>
                        <ul className="nav nav-divider py-2 small">
                          <li className="nav-item">
                            <Link className="nav-link" href="">
                              {' '}
                              Like (3)
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="">
                              {' '}
                              Reply
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" href="">
                              {' '}
                              View 5 replies
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>)}
        </Row>
      </CardBody>
    </Card>;
};
export default Media;