import { LettercasePipe } from './lettercase.pipe';

describe('LettercasePipe', () => {
  let pipe: LettercasePipe;

  beforeAll(() => {
    pipe = new LettercasePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('uppercase test', () => {
    expect(pipe.transform('This is test', 'uppercase')).toBe('THIS IS TEST');
  })

  it('lowercase test', () => {
    expect(pipe.transform('This is test', 'lowercase')).toBe('this is test');
  })

  it('kebabcase test', () => {
    expect(pipe.transform('This is test', 'kebabcase')).toBe('this-is-test');
  })
});
