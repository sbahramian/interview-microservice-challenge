export class CommonConvertor {
  static DurationToRedisTTL(duration: string): number {
    const durationRegex = /^(\d+)([smhdw])$/;
    const match = duration.match(durationRegex);

    if (!match) {
      return 0;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    // Convert to seconds based on the unit
    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      case 'w':
        return value * 604800;
      default:
        return 0;
    }
  }

  static CapitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
