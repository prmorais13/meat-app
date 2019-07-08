export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}

  matches(another: User): boolean {
    return (
      another !== undefined &&
      another.email === this.email &&
      another.password === this.password
    );
  }
}

export const users: { [key: string]: User } = {
  'prmorais1302@gmail.com': new User(
    'prmorais1302@gmail.com',
    'Paulo Roberto',
    'Paulo13'
  ),
  'nanda04@gmail.com': new User(
    'nanda04@gmail.com',
    'Maria Fernanda',
    'Nanda04'
  )
};
