import { describe, it, expect } from "vitest";
import { sleep } from "../index";


describe("Testing sleep util", ()=>{
    it('sleep resolves after the specified delay', async () => {
        const delay = 400; 
        const startTime = Date.now();
        await sleep(delay);
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(delay);
      });

      it('sleep resolves immediately for zero delay', async () => {
        const delay = 0;
        const startTime = Date.now();
        await sleep(delay);
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        expect(elapsed).toBeLessThan(20); // Allow a small margin for timing inaccuracies
      });


      it('sleep resolves immediately for negative delay', async () => {
        const delay = -100; // Negative delay
        const startTime = Date.now();
        await sleep(delay);
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        expect(elapsed).toBeLessThan(10); // Allow a small margin for timing inaccuracies
      });

      it('sleep resolves for multiple sequential calls', async () => {
        const delays = [500, 100, 700];
        const startTime = Date.now();
    
        for (const delay of delays) {
          await sleep(delay);
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          expect(elapsed).toBeGreaterThanOrEqual(delay);
        }
      });

      it('sleep resolves for parallel calls with different delays', async () => {
        const delays = [200, 300, 400];
        const startTime = Date.now();
        const promises = delays.map(delay => sleep(delay));
    
        await Promise.all(promises);
    
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        const expectedElapsed = Math.max(...delays);
        expect(elapsed).toBeGreaterThanOrEqual(expectedElapsed);
      });
    
    
})