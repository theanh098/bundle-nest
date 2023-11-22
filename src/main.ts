import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// const createUnfulfilledOrderHistory = ({
//     userId,
//     currency,
//     unfulfilledOrderRepository,
//     unfulfilledOrderHistoryRepository,
//     tradeDate,
//   }: {
//     userId: string;
//     currency: Money.SupportedCurrencies;
//     tradeDate: DateTime;
//     unfulfilledOrderRepository: UnfulfilledOrderRepository;
//     unfulfilledOrderHistoryRepository: UnfulfilledOrderHistoryRepository;
//   }) =>
//     pipe(
//       RA.fromArray([
//         unfulfilledOrderRepository.findInstantOrderByUserIdAndCurrency(
//           userId,
//           currency
//         ),
//         unfulfilledOrderRepository.findNonInstantOrderByUserIdAndCurrency(
//           userId,
//           currency
//         ),
//       ]),
//       TE.sequenceArray,
//       TE.map(
//         RA.zip([
//           WorkflowType.InstantNoAdjustment,
//           WorkflowType.NonInstantPaySettlement,
//         ])
//       ),
//       TE.map(
//         RA.map(([unfulfilledOrder, type]) =>
//           unfulfilledOrderHistoryRepository.createUnfulfilledOrderHistory({
//             userId,
//             closingAmount:
//               unfulfilledOrder?.amount || Money.fromCode(currency).zero,
//             type,
//             date: tradeDate,
//           })
//         )
//       ),
//       TE.map(TE.sequenceArray)
//     );
