// منتظر می‌مونیم تا کل DOM لود بشه
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");       // فرم ورودی
  const input = document.getElementById("todo-input");     // فیلد ورودی تسک
  const list = document.getElementById("todo-list");       // لیست تسک‌ها

  // وقتی فرم ارسال شد
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه

    const taskText = input.value.trim(); // گرفتن مقدار ورودی

    // اگر ورودی خالی بود، کاری نکن
    if (taskText === "") return;

    // ساختن المان جدید li
    const li = document.createElement("li");
    li.textContent = taskText;

    // دکمه حذف برای هر تسک
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";

    // حذف تسک وقتی روی دکمه کلیک می‌کنی
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    // علامت‌زدن تسک به عنوان انجام‌شده با کلیک روی خودش
    li.addEventListener("click", () => {
      li.classList.toggle("done");
    });

    // اضافه کردن دکمه حذف به li
    li.appendChild(deleteBtn);

    // اضافه کردن li به لیست
    list.appendChild(li);

    // خالی کردن ورودی
    input.value = "";
  });
});
