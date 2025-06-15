import mapLanguageToExtension from "../assets/mapLanguageToExtension.json";
import { toast } from "sonner";

export default (code, language) => {
  const filename = "source_code." + mapLanguageToExtension[language];
  toast.info("Download your file", {
    description: "Your file is ready for download.",
  });
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(blob);
};
