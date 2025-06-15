import mapLanguageToExtension from '../assets/mapLanguageToExtension.json';
import { DURATION } from 'baseui/snackbar';
export default (code, language, enqueue) => {
    const filename = "source_code." + mapLanguageToExtension[language];
    enqueue({
        progress: true,
        message: `Download your file`,
        actionMessage: "Close",
    },
        DURATION.short
    )
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blob);
}