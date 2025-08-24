useEffect(() => {
  const fetchData = async () => {
    try {
      const pptRes = await fetch(`${BASE}/drive/${id}`);
      const pptData = await pptRes.json();

      const finalTopics =
        Array.isArray(pptData) && pptData.length
          ? pptData.map((file: any) => ({
              name: file.name.replace(/\.pptx?$/i, ""),
              url: file.previewUrl || file.webViewLink,
              assignments: [],
            }))
          : [];

      setTopics(finalTopics);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching materials:", err);

      const backups: Record<string, string[]> = {
        "Data-Science": [
          "https://docs.google.com/presentation/d/1kAban4f0Uuqk_mKTjLmBOW4dOEfmvKt3/preview",
          "https://docs.google.com/presentation/d/1CIUkcmkhtQQgRJYw76S6DRWdZv-GT-Fl/preview",
          "https://docs.google.com/presentation/d/1Hg4JYyl_CGBIZqtygFupfF2vdnG4-3BU/preview",
          "https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview",
          "https://docs.google.com/presentation/d/1C7iZmnKe7cAv5snL3DD3PvdO_N7Yk81p/preview",
        ],
        SQL: [
          "https://docs.google.com/presentation/d/1BECUfhOhXTDWfNPJZDxw4gA1giWYwK1E/preview",
          "https://docs.google.com/presentation/d/1kRJxhgK8ShxRfFRWKMElktz52u1qgWXo/preview",
          "https://docs.google.com/presentation/d/1AbhTDz1cjwZxkhJRdZNnPIar1RIRdlnL/preview",
          "https://docs.google.com/presentation/d/1gjEb5G9LFgT0fZ8XPBqh1lWvtUIO2VP3/preview",
          "https://docs.google.com/presentation/d/192soPE6O_xZ1z5QyIcBgcJ-f1NbmKvjR/preview",
        ],
        "Power-BI": [
          "https://docs.google.com/presentation/d/1Y6i26XAA8OTZFrUSKQugal_zJUHPF3iu/preview",
          "https://docs.google.com/presentation/d/19FoSK-2SB7Lf7ZF8zkXyMmyhiV5GWIEe/preview",
          "https://docs.google.com/presentation/d/1e6XjemjvS-gqSl6OPqv1WW96dqpGoPCa/preview",
          "https://docs.google.com/presentation/d/1cka_VZaaO4bvj7P8t4kv2-0pkkM6c4PD/preview",
          "https://docs.google.com/presentation/d/1MJ3TsDgAN31f-UviHIYJZN-52GL8e_Hh/preview",
        ],
      };

      // ✅ Safe fallback
      if (id && backups[id]) {
        setTopics(
          backups[id].map((link, idx) => ({
            name: `${id} Backup PPT ${idx + 1}`,
            url: link,
          }))
        );
      } else {
        setTopics([]);
      }

      setLoading(false);
    }
  };

  if (id) fetchData(); // ✅ only run if id is defined
}, [id]);
