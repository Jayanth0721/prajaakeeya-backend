import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { join } from 'path';

export interface ExtractionJob {
  wardId: number;
  wardName?: string;
  status: string;
  progress: number;
}

@Injectable()
export class ExtractionService {
  private queue: ExtractionJob[] = [];

  async trigger(wardId: number) {
    const job: ExtractionJob = { wardId, status: 'queued', progress: 5 };
    this.queue = this.queue.filter((existing) => existing.wardId !== wardId);
    this.queue.push(job);

    const scriptPath = join(process.cwd(), 'extractor', 'main.py');
    const uploadPath = join(process.cwd(), 'uploads', `ward-${wardId}`);
    job.status = 'processing';
    job.progress = 20;

    const processRef = spawn('python3', [scriptPath, '--ward', String(wardId), '--input', uploadPath], {
      stdio: 'inherit'
    });

    processRef.on('close', (code) => {
      job.status = code === 0 ? 'completed' : 'failed';
      job.progress = code === 0 ? 100 : 0;
      setTimeout(() => {
        this.queue = this.queue.filter((item) => item.wardId !== wardId);
      }, 60000);
    });

    return { message: 'Extraction started' };
  }

  async getQueue(): Promise<ExtractionJob[]> {
    return this.queue;
  }
}
