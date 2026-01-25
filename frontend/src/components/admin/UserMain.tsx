import React from "react";

const UserMain: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#f8fbfb] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f181a] tracking-tight">
              User Management
            </h2>
            <p className="text-[#538893] mt-1 text-base">
              Overview of all system users, access levels and activity status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e8f0f2] bg-white text-[#0f181a] rounded-lg text-sm font-semibold hover:bg-[#f8fbfb] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">
                file_download
              </span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e8f0f2] text-[#0f181a] rounded-lg cursor-pointer hover:bg-[#dfe9eb] transition-colors">
            <span className="text-sm font-semibold">All Roles</span>
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e8f0f2] text-[#538893] rounded-lg cursor-pointer hover:bg-[#f8fbfb] transition-colors">
            <span className="text-sm font-medium">Active</span>
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#e8f0f2] text-[#538893] rounded-lg cursor-pointer hover:bg-[#f8fbfb] transition-colors">
            <span className="text-sm font-medium">Joined: Last 30 days</span>
            <span className="material-symbols-outlined text-sm">
              keyboard_arrow_down
            </span>
          </div>
          <div className="ml-auto text-xs text-[#538893] font-medium">
            Showing <span className="text-[#0f181a] font-bold">124</span> users
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#e8f0f2] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f7f7f7] border-b border-[#e8f0f2]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-[#538893] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#538893] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#538893] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#538893] uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#538893] uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              <tr className="hover:bg-[#f8fbfb] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10">
                      <img
                        className="w-full h-full object-cover"
                        alt="User profile avatar male"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS-otwwhzbjfvPj-lr5HvVY0LAVYQOJ1PVzJn61w1o_Kk2Vz5LqFGdVBEDeTS-Qq0PM_uwgRIhZczpwe-QyYHXtVnSFV72pT3dKFKcZlI7g_45hVkmwBUTUc8ecm8bdk7kRO8_VZA0enednrspr4iev2UH1hxkXdBnECWnwiSM_iFR6DE1ABGNd9_sMSjI47M4Szj72ZbXeofOthavRYChYWx-ffYhFUYbS14-RIoxO0P4g6L3Nodp6EtG2WijVSMBjx2OTPHE-tI"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f181a] leading-none">
                        James Wilson
                      </p>
                      <p className="text-xs text-[#538893] mt-1">
                        james.wilson@hotelsaas.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                    <span className="material-symbols-outlined text-sm">shield_person</span>
                    <span>Admin</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-700">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#538893]">Oct 24, 2023</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-[#538893] hover:text-primary transition-colors hover:bg-primary/5 rounded">
                      <span className="material-symbols-outlined text-xl">
                        edit_square
                      </span>
                    </button>
                    <button className="p-1.5 text-[#538893] hover:text-red-600 transition-colors hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-[#f8fbfb] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e8f0f2]">
                      <img
                        className="w-full h-full object-cover"
                        alt="User profile avatar female"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq7WxnsYsjIqFvx1G086WlbgkrIcOabW2ZgKT3segRHQZDxsdUQSBOxtj09qmUSxT0fLE5pXwUQFjVs5qN7YCBAKYkQy2Ou57TV23YCXbC9x80-GIoYQsUO4qoWaPZY67bj7cYuouGKqysghbWP8aCBf2KgNyYdNsAwF2MlV19VG05MEed0n8XOrk4JqJ4ZFLbWpAqbvYvCD-BO_FiNc9YEsgRnkX8-wdJSZ0kfx0xjGFJTO0jt8GUmC7pekZzB2FBXj0DPMbxZaM"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f181a] leading-none">
                        Sarah Chen
                      </p>
                      <p className="text-xs text-[#538893] mt-1">
                        s.chen@outlook.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    <span>Staff</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-700">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#538893]">Nov 12, 2023</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-[#538893] hover:text-primary transition-colors hover:bg-primary/5 rounded">
                      <span className="material-symbols-outlined text-xl">
                        edit_square
                      </span>
                    </button>
                    <button className="p-1.5 text-[#538893] hover:text-red-600 transition-colors hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-[#f8fbfb] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e8f0f2]">
                      <img
                        className="w-full h-full object-cover"
                        alt="User profile avatar male business"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvmcSJlV8r-P-LyhWqoeheQ_lMk-hegYc08tDf_6fVA0y-4gYAwdlwaPpH9ctnFkbzmiG138YoHNeQwrLc9nuZLDjFdsKMXzz1YOm6jVaAJthCmqaKCr7pKkyz1t_y0aj3Jf9utG1XnfKjMlQVm7kOhn_tndyLuf6cSZ9oxzwTd9JUoogw9W_Fx859YMkIvkF1HTe138fDh7ufbQLmz8yeEMTYdO70-GzRNJ4Co-VWEhwcHC38XJgQD22P4hZXJwethJkXG8RMH48"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f181a] leading-none">
                        Michael Ross
                      </p>
                      <p className="text-xs text-[#538893] mt-1">
                        m.ross@gmail.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-100 text-teal-700 border border-teal-200">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>Customer</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs font-semibold text-red-700">Blocked</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#538893]">Dec 05, 2023</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-[#538893] hover:text-primary transition-colors hover:bg-primary/5 rounded">
                      <span className="material-symbols-outlined text-xl">
                        edit_square
                      </span>
                    </button>
                    <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-xl">
                        undo
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-[#f8fbfb] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e8f0f2]">
                      <img
                        className="w-full h-full object-cover"
                        alt="User profile avatar female creative"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX-xa30cuIrQOjAxbxSknxjCNoSO2RqWq9DL2SbeAYLnCBFDTM90wwKFsDKkBWLoAyfkOF8rlieBPc_B4hIIUXNIx_Xsc--T_a1qZH_Z3IuKcCXtd7NUmY_yLf-8S9GxoOy6s3kB9tIBXU0XXuT4mNSPZ0mp0K5e8YZk9jpLcdoUjmYVCL6Dk5A-TCdJdtsL0qbPQpiLctstAYz0a3cx68DD1Y99o7Gyzdmkt1y5kqUH4ZNRq7L6frvZzLr5i23n3_EsseObhgR-0"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f181a] leading-none">
                        Elena Rodriguez
                      </p>
                      <p className="text-xs text-[#538893] mt-1">
                        elena.rodriguez@hotel.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                    <span className="material-symbols-outlined text-sm">badge</span>
                    <span>Staff</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-xs font-semibold text-amber-700">Inactive</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#538893]">Jan 15, 2024</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-[#538893] hover:text-primary transition-colors hover:bg-primary/5 rounded">
                      <span className="material-symbols-outlined text-xl">
                        edit_square
                      </span>
                    </button>
                    <button className="p-1.5 text-[#538893] hover:text-red-600 transition-colors hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-[#f8fbfb] transition-colors border-none">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e8f0f2]">
                      <img
                        className="w-full h-full object-cover"
                        alt="User profile avatar male default"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2GqQM6gTSKScnAzbhLX98ljhOpxhFSCONdT-CSPwyRGPmqpWZpaX0u1afYMsXBXbrus8Tzk19wHbxZraNiYmkBiUmKr4th0PBa08SFRGzA0E2tQXgFxq2dnUME62kh3NHbnYWGfKhk7LeddN-VUXWUWWtTnaVWqA-QyItFyCrg-dWS0t_DRDOvN48QLrZUL7BmibEW0K1Y8R9SyyT3jkaCxvqPUD6CAsry1FQa19BxG0A17Hv1fHsqyBw7BsI21uzjnRmkbNqls"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f181a] leading-none">
                        David Kim
                      </p>
                      <p className="text-xs text-[#538893] mt-1">
                        dkim@visitor.com
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-100 text-teal-700 border border-teal-200">
                    <span className="material-symbols-outlined text-sm">person</span>
                    <span>Customer</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-700">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#538893]">Feb 02, 2024</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-[#538893] hover:text-primary transition-colors hover:bg-primary/5 rounded">
                      <span className="material-symbols-outlined text-xl">
                        edit_square
                      </span>
                    </button>
                    <button className="p-1.5 text-[#538893] hover:text-red-600 transition-colors hover:bg-red-50 rounded">
                      <span className="material-symbols-outlined text-xl">
                        block
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-6 py-4 bg-white border-t border-[#e8f0f2] flex items-center justify-between">
            <p className="text-xs text-[#538893] font-medium">
              Page <span className="text-[#0f181a] font-bold">1</span> of 12
            </p>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e8f0f2] text-[#538893] hover:bg-[#f8fbfb] disabled:opacity-50"
                disabled={true}
              >
                <span className="material-symbols-outlined text-base">
                  chevron_left
                </span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#538893] hover:bg-[#f8fbfb] font-medium text-xs">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#538893] hover:bg-[#f8fbfb] font-medium text-xs">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e8f0f2] text-[#538893] hover:bg-[#f8fbfb]">
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserMain;