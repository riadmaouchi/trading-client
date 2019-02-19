import PricingService from './esp/tile/epic/pricingService';
import ExecutionService from './esp/tile/epic/executionService';
import TradeBlotterService from './esp/blotter/epic/tradeBlotterService';
import OrderbookService from './order/epic/orderbookService';
import OrderBlotterService from './order/components/blotter/epic/orderBlotterService';
import OrderService from './order/epic/orderService';

export interface ApplicationProps {
  pricingService: PricingService;
  executionService: ExecutionService;
  tradeBlotterService: TradeBlotterService;
  orderbookService: OrderbookService;
  orderBlotterService: OrderBlotterService;
  orderService: OrderService;
}

export function createApplicationServices({
  pricingService,
  executionService,
  tradeBlotterService,
  orderbookService,
  orderBlotterService,
  orderService
}: ApplicationProps) {
  return {
    pricingService,
    executionService,
    tradeBlotterService,
    orderbookService,
    orderBlotterService,
    orderService
  };
}

export type ApplicationDependencies = ReturnType<
  typeof createApplicationServices
>;
