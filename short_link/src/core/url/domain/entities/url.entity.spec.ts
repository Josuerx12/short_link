import { UrlEntity } from './url.entity';

describe('Create a new URL entity', () => {
  it('Should create a new url entity.', () => {
    const entity = new UrlEntity({
      originalUrl: 'https://google.com',
      shortCode: UrlEntity.generateShortCode(),
      visitCount: 0,
    });

    expect(entity.originalUrl).toBe('https://google.com');
    expect(entity.shortCode).toBeDefined();
    expect(entity.visitCount).toBe(0);
  });

  it('Should generate a short code.', () => {
    const code = UrlEntity.generateShortCode();

    expect(code).toBeDefined();
    expect(code.length).toBe(6);
  });
});
