import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { PaymentService } from "../services/PaymentService";
import { Public } from "../decorators/public";
import { SepayDataWebhook } from "../types/sepay";

@Service()
@JsonController("/payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @Post("/process-webhook")
  async processWebhook(@Body() data: SepayDataWebhook) {
    return this.paymentService.processWebhook(data);
  }
}
