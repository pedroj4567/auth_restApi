import morgan from 'morgan'

export class MonganAdapter { 

    static morgan() {
        return morgan('tiny')
     }
}