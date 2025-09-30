import React, { useEffect, useMemo, useState } from "react";

const DATA_TYPES = [
  { key: "photo", label: "Site Photo" },
  { key: "geoPhoto", label: "Geo-tagged Photo" },
  { key: "drone", label: "Drone Image" },
  { key: "sensor", label: "Sensor Log (CSV)" },
  { key: "survey", label: "Field Survey" },
];

const UploadFieldDataModal = ({ isOpen, project, onClose, onSubmit }) => {
  const [type, setType] = useState("photo");
  const [images, setImages] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [csvRowCount, setCsvRowCount] = useState(0);
  const [surveyRows, setSurveyRows] = useState(10);

  // location state
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [locStatus, setLocStatus] = useState("");

  // reset each time modal opens
  useEffect(() => {
    if (isOpen) {
      setType("photo");
      setImages([]);
      setCsvFile(null);
      setCsvRowCount(0);
      setSurveyRows(10);
      setLat("");
      setLng("");
      setLocStatus("Fetching location...");

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const la = pos.coords.latitude.toFixed(6);
            const lo = pos.coords.longitude.toFixed(6);
            setLat(la);
            setLng(lo);
            setLocStatus("✔ Location captured");
          },
          () => setLocStatus("❌ Location unavailable")
        );
      } else {
        setLocStatus("❌ Geolocation not supported");
      }
    }
  }, [isOpen]);

  const recordsCount = useMemo(() => {
    if (type === "sensor") return csvRowCount || (csvFile ? 20 : 0);
    if (type === "survey") return Number.isFinite(Number(surveyRows)) ? Number(surveyRows) : 0;
    return images.length || 0;
  }, [type, csvRowCount, csvFile, surveyRows, images.length]);

  if (!isOpen) return null;

  const handleImages = (e) => setImages(Array.from(e.target.files || []));
  const handleCsv = (e) => {
    const f = (e.target.files || [])[0];
    setCsvFile(f || null);
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = (reader.result || "").toString().split(/\r?\n/).filter(Boolean);
      setCsvRowCount(lines.length > 1 ? lines.length - 1 : lines.length);
    };
    reader.readAsText(f);
  };

  const verifyLocation = () => {
    if (!lat || !lng) return false;
    const la = parseFloat(lat);
    const lo = parseFloat(lng);
    return !isNaN(la) && !isNaN(lo) && Math.abs(la) <= 90 && Math.abs(lo) <= 180;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!project?.id) {
      alert("No project selected.");
      return;
    }
    if (recordsCount <= 0) {
      alert("Please add at least one record.");
      return;
    }
    if (type === "geoPhoto" && !verifyLocation()) {
      alert("Invalid location. Please allow location access or enter valid coordinates.");
      return;
    }

    const payload = {
      projectId: project.id,
      type,
      recordsCount,
      meta: {
        lat: lat || null,
        lng: lng || null,
      },
    };

    console.log("UPLOAD MODAL PAYLOAD >>>", payload);
    onSubmit?.(payload);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg bg-card border border-border rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upload Field Data</h3>
          <p className="text-xs text-muted-foreground">Project: {project?.name}</p>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="p-4 space-y-4">
          {/* Type selector */}
          <div className="flex gap-2 flex-wrap">
            {DATA_TYPES.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setType(d.key)}
                className={`px-3 py-1 rounded border ${
                  type === d.key ? "bg-primary text-white" : "border-border"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Conditional inputs */}
          {(type === "photo" || type === "geoPhoto" || type === "drone") && (
            <input type="file" multiple accept="image/*" onChange={handleImages} />
          )}
          {type === "sensor" && (
            <input type="file" accept=".csv,text/csv" onChange={handleCsv} />
          )}
          {type === "survey" && (
            <input
              type="number"
              min="1"
              value={surveyRows}
              onChange={(e) => setSurveyRows(Number(e.target.value))}
            />
          )}

          {/* Location info */}
          {type === "geoPhoto" && (
            <div className="text-xs">
              <span className={verifyLocation() ? "text-green-600" : "text-red-600"}>
                {locStatus}
              </span>
              {lat && lng && (
                <span className="ml-2 text-muted-foreground">
                  ({lat}, {lng})
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs">Records: {recordsCount}</span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadFieldDataModal;
