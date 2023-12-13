import { Injectable } from "@nestjs/common";

import type { DatabaseQueryNotFoundError } from "@root/shared/errors/database-query-not-found.error";
import type { DatabaseQueryError } from "@root/shared/errors/database-query.error";
import type { City } from "@root/shared/IO/City.io";
import type { NonCtxE } from "@root/shared/types/non-context-effect.type";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import { safetyFindOne } from "@root/shared/helpers/safety-find-one";

@Injectable()
export class CityRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): NonCtxE<DatabaseQueryError | DatabaseQueryNotFoundError, City> {
    return safetyFindOne("cities", { id })(
      this.db.query.city.findFirst({
        where: (cols, opts) => opts.eq(cols.id, id)
      })
    );
  }
}
