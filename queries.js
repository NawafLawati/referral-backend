const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'me',
//   host: 'dpg-coim36gl5elc73d9s4pg-a',
//   database: 'api_bkp6',
//   password: '2zky4A56BoxWrhbyCtN03cci2SKyq535',
//   port: 5432,
// })
const pool = require('./DBConfig');

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByCode = (request, response) => {
    const code = request.params.code

    pool.query('SELECT * FROM users WHERE code = $1', [code], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
  const { name, email, code } = request.body

  pool.query('INSERT INTO users (name, email, code) VALUES ($1, $2, $3)', [name, email, code], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, code, referrals } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2, code = $3, referrals = $5 WHERE id = $4',
    [name, email, code, id, referrals],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  getUserByCode,
  createUser,
  updateUser,
  deleteUser,
}