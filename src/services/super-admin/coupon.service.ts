import { HttpService } from '@/services/global';

export class CouponService {
  static async findOne(id: string) {
    return await HttpService.get(`/coupon/${id}`);
  }

  static async findAll(filter: string = '', category: string = '') {
    return await HttpService.get(`/coupon?name=${filter}&status=${category}`);
  }

  static async createOne(coupon: any) {
    return await HttpService.post('/coupon', coupon);
  }

  static async updateOne(id: string, coupon: any) {
    return await HttpService.put(`/coupon?id=${id}`, coupon);
  }

  static async deleteOne(id: string) {
    return await HttpService.delete(`/coupon?id=${id}`);
  }
}
