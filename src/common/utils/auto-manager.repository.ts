import { EntityManager, Repository } from 'typeorm';

export class AutoManagerRepository<T> {
  private proxy: Repository<T>;

  constructor(
    private readonly repository: Repository<T>,
    private readonly manager?: EntityManager,
  ) {
    // Proxy를 사용해 repository의 모든 메서드를 유연하게 호출할 수 있게 설정
    this.proxy = new Proxy(this.repository, {
      get: (target, prop) => {
        // EntityManager가 있으면 manager의 메서드를 호출하고, 없으면 기본 repository 사용
        const source = this.manager || target;
        const method = source[prop];
        if (typeof method === 'function') {
          return method.bind(source);
        }
        return method;
      },
    });
  }

  get proxyInstance(): Repository<T> {
    return this.proxy;
  }

}
