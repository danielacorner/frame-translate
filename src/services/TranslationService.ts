import { Frame } from '@brilliant/frame-sdk';

export class TranslationService {
  static async initialize() {
    try {
      await Frame.initialize({
        // Add your Frame SDK initialization options here
        apiKey: process.env.FRAME_API_KEY,
      });
    } catch (error) {
      console.error('Frame SDK initialization failed:', error);
    }
  }

  static async checkDeviceConnection() {
    try {
      const isConnected = await Frame.isDeviceConnected();
      return isConnected;
    } catch (error) {
      console.error('Device connection check failed:', error);
      return false;
    }
  }
}

export default TranslationService;