let counter = 0;

export const LoadingScreenPrefab = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `${canvas.width / 100}px arial`;
    context.fillText(`Loading${'.'.repeat(~~(counter++ / 5) % 4)}`, canvas.width / 2, canvas.height / 2);
};