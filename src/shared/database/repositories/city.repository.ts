import { Injectable } from "@nestjs/common";

import { Database } from "@root/shared/database";
import { InjectDb } from "@root/shared/decorators/database.decorator";
import type { DatabaseQueryNotFoundError } from "@root/shared/errors/database-query-not-found.error";
import type { DatabaseQueryError } from "@root/shared/errors/database-query.error";
import { safetyFindOne } from "@root/shared/helpers/safety-find-one";
import type { City } from "@root/shared/IO/City.io";
import type { NonCtxEft } from "@root/shared/types/non-context-effect.type";

@Injectable()
export class CityRepository {
  constructor(@InjectDb() private db: Database) {}

  public findById(
    id: number
  ): NonCtxEft<DatabaseQueryError | DatabaseQueryNotFoundError, City> {
    return safetyFindOne("cities", { id })(
      this.db.query.city.findFirst({
        where: (cols, opts) => opts.eq(cols.id, id)
      })
    );
  }
}
