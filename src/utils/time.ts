

export function formatTimeDelta(seconds: number): string {
    // แปลงวินาทีเป็นชั่วโมง, นาที, และวินาที
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // ใช้ padStart เพื่อให้แน่ใจว่ามี 2 หลัก
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // คืนค่าผลลัพธ์ในรูปแบบ HH:MM:SS
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
