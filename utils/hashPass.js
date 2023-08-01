import bcrypt from 'bcrypt'

export const hashPass = (pass) => {
    const hashedPass = bcrypt.hashSync(pass, 10)
    return hashedPass
}

export const isValidPass = (pass, reqPass) => {
    return bcrypt.compareSync(pass, reqPass)
}