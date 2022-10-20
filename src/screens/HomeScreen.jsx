import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addStudent,
  deleteStudent,
  getAllStudents,
} from '../features/studentSlice'
const HomeScreen = () => {
  const [modalShow, setModalShow] = useState(false)
  const [input, setInput] = useState({ subject: '', marks: '', name: '' })
  const [id, setId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { students } = useSelector((state) => state.student)
  console.log(students)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  useEffect(() => {
    dispatch(getAllStudents())
  }, [dispatch])

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addStudent(input))
    setModalShow(false)
  }

  const onShow = () => {
    // if (!id) setInput({ subject: '', marks: '', name: '' })
    // else
    //   setInput({
    //     email: students[id - 1].subject,
    //     password: students[id - 1].marks,
    //     name: students[id - 1].name,
    //   })
  }

  return (
    <Container className='mt-5'>
      <div className='d-flex gap-5 mb-4'>
        <h3>User : {user.name}</h3>
        <div>
          <Button>Logout</Button>
        </div>
      </div>
      <Button className='mb-3' onClick={() => setModalShow(true)}>
        Add Content
      </Button>
      <Table bordered hover style={{ maxWidth: '45rem' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student, id) => {
              return (
                <tr key={student._id}>
                  <td>{id + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.subject}</td>
                  <td>{student.marks}</td>
                  <td>
                    <Button
                      className='me-3'
                      onClick={() => {
                        setId(id + 1)
                        setModalShow(true)
                      }}
                    >
                      edit
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() => dispatch(deleteStudent(student._id))}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onShow={onShow}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {id ? 'Update Content' : 'Add Content'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                name='name'
                onChange={onChange}
                value={input.name}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter subject'
                name='subject'
                onChange={onChange}
                value={input.subject}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Marks'
                name='marks'
                onChange={onChange}
                value={input.marks}
                min={0}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default HomeScreen
