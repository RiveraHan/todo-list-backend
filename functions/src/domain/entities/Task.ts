export class Task {
  constructor(
        public readonly id: string,
        public readonly userId: string,
        public title: string,
        public description: string,
        public status: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
  ) {}
}
